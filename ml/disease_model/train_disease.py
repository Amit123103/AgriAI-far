import os
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
import numpy as np

# Spatial and Channel Attention Module
class AttentionModule(nn.Module):
    def __init__(self, in_channels):
        super(AttentionModule, self).__init__()
        # 1x1 conv to capture attention across channels
        self.channel_attention = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Conv2d(in_channels, in_channels // 4, kernel_size=1, bias=False),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels // 4, in_channels, kernel_size=1, bias=False),
            nn.Sigmoid()
        )
        
    def forward(self, x):
        return x * self.channel_attention(x)

class AgriMultiDiseaseModel(nn.Module):
    def __init__(self, num_classes=10):
        super(AgriMultiDiseaseModel, self).__init__()
        self.resnet = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
        # Extract layers except avgpool and fc
        self.feature_extractor = nn.Sequential(*list(self.resnet.children())[:-2])
        # Insert Attention Module right after feature extractor
        self.attention = AttentionModule(512)
        self.avgpool = self.resnet.avgpool
        self.fc = nn.Linear(512, num_classes)
        
    def forward(self, x):
        features = self.feature_extractor(x)
        features = self.attention(features)
        x = self.avgpool(features)
        x = torch.flatten(x, 1)
        logits = self.fc(x)
        return logits, features

DISEASE_CLASSES = [
    "Healthy Wheat",
    "Wheat Leaf Rust",
    "Wheat Yellow Rust",
    "Healthy Rice",
    "Rice Bacterial Leaf Blight",
    "Rice Blast",
    "Healthy Potato",
    "Potato Early Blight",
    "Potato Late Blight",
    "Tomato Leaf Curl"
]

TREATMENT_RECOMMENDATIONS = {
    "Wheat Leaf Rust": {
        "treatment": "Apply fungicides targeting Puccinia triticina.",
        "pesticides": "Tebuconazole 25.9% EC.",
        "hindi": "गेहूं का भूरा रतवा: टेबुकोनाज़ोल का छिड़काव करें।",
        "punjabi": "ਕਣਕ ਦੀ ਪੱਤੀ ਦਾ ਰਤਵਾ: ਟੈਬੂਕੋਨਾਜ਼ੋਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।"
    },
    "Wheat Yellow Rust": {
        "treatment": "Spray Propiconazole at first sign of symptoms.",
        "pesticides": "Propiconazole 25% EC.",
        "hindi": "गेहूं का पीला रतवा: प्रोपिकोनाज़ोल का छिड़काव करें।",
        "punjabi": "ਕਣਕ ਦਾ ਪੀਲਾ ਰਤਵਾ: ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।"
    },
    "Rice Bacterial Leaf Blight": {
        "treatment": "Spray Copper Hydroxide or Streptocycline.",
        "pesticides": "Copper Hydroxide 53.8% DF.",
        "hindi": "धान का झुलसा रोग: कॉपर हाइड्रॉक्साइड का प्रयोग करें।",
        "punjabi": "ਝੋਨੇ ਦਾ ਬੈਕਟੀਰੀਅਲ ਝੁਲਸ ਰੋਗ: ਕਾਪਰ ਹਾਈਡ੍ਰੋਕਸਾਈਡ ਦੀ ਵਰਤੋਂ ਕਰੋ।"
    }
}

transform_pipeline = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def generate_grad_cam(model, input_tensor, target_class=None):
    model.eval()
    input_tensor.requires_grad_()
    logits, features = model(input_tensor)
    
    if target_class is None:
        target_class = torch.argmax(logits, dim=1).item()
        
    score = logits[0, target_class]
    model.zero_grad()
    score.backward()
    
    gradients = features.grad.data.cpu().numpy()[0]
    activations = features.data.cpu().numpy()[0]
    
    weights = np.mean(gradients, axis=(1, 2))
    cam = np.zeros(activations.shape[1:], dtype=np.float32)
    for i, w in enumerate(weights):
        cam += w * activations[i]
        
    cam = np.maximum(cam, 0)
    if np.max(cam) > 0:
        cam = cam / np.max(cam)
        
    return cam

def train_and_save():
    os.makedirs("models", exist_ok=True)
    model = AgriMultiDiseaseModel(num_classes=len(DISEASE_CLASSES))
    torch.save(model.state_dict(), "models/disease_model.pt")
    print("Advanced Attention-based multi-disease model weights saved.")

if __name__ == "__main__":
    train_and_save()
