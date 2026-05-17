import { useState } from 'react';

const TRANSLATIONS = {
  en: {
    appTitle: "AgriAI Enterprise Platform",
    appSubtitle: "Advanced precision farming, satellite data, and multi-disease diagnostics",
    navDashboard: "Dashboard",
    navDisease: "Multi-Disease Scan",
    navYield: "Hybrid Yield Forecast",
    navRec: "Smart Advice & Alerts",
    navVoice: "AI Voice Assistant",
    langToggle: "Language",
    predictYield: "Generate Prediction",
    predictDisease: "Scan Multi-Disease Image",
    resultsHeading: "Multi-Label AI Diagnosis",
    yieldResultsHeading: "Advanced Hybrid Forecast",
    treatmentAdvice: "Localized Advice",
    climateImpact: "Climate Change Impact",
    cropType: "Crop Type",
    districtState: "District / State",
    soilType: "Soil Type",
    rainfall: "Rainfall (mm)",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    ndvi: "NDVI Index",
    askVoice: "Conversational AI Assistant",
    listening: "Listening with context...",
    transcript: "Your Audio Query:",
    speakPrompt: "Tap mic to activate assistant"
  },
  hi: {
    appTitle: "AgriAI एंटरप्राइज",
    appSubtitle: "उन्नत सटीक खेती, उपग्रह डेटा और बहु-रोग निदान",
    navDashboard: "डैशबोर्ड",
    navDisease: "बहु-रोग निदान",
    navYield: "उपज कैलकुलेटर",
    navRec: "सलाह और अलर्ट",
    navVoice: "एआई आवाज सहायक",
    langToggle: "भाषा",
    predictYield: "पूर्वानुमान लगाएं",
    predictDisease: "फसल की तस्वीर स्कैन करें",
    resultsHeading: "एआई बहु-रोग नैदानिक परिणाम",
    yieldResultsHeading: "उन्नत पूर्वानुमान",
    treatmentAdvice: "उपचार और कीटनाशक",
    climateImpact: "जलवायु परिवर्तन प्रभाव",
    cropType: "फसल का प्रकार",
    districtState: "जिला / राज्य",
    soilType: "मिट्टी का प्रकार",
    rainfall: "वर्षा (मिमी)",
    temperature: "तापमान (°C)",
    humidity: "आर्द्रता (%)",
    ndvi: "एनडीवीआई सूचकांक",
    askVoice: "एआई सहायक से पूछें",
    listening: "सुन रहे हैं...",
    transcript: "आपकी आवाज़:",
    speakPrompt: "बोलने के लिए माइक पर टैप करें"
  },
  pa: {
    appTitle: "AgriAI Enterprise",
    appSubtitle: "ਸਟੀਕ ਖੇਤੀ, ਸੈਟੇਲਾਈਟ ਡੇਟਾ ਅਤੇ ਬਹੁ-ਬਿਮਾਰੀ ਨਿਦਾਨ",
    navDashboard: "ਡੈਸ਼ਬੋਰਡ",
    navDisease: "ਬਹੁ-ਬਿਮਾਰੀ ਨਿਦਾਨ",
    navYield: "ਉਪਜ ਕੈਲਕੁਲੇਟਰ",
    navRec: "ਸਲਾਹ ਅਤੇ ਅਲਰਟ",
    navVoice: "ਏਆਈ ਆਵਾਜ਼ ਸਹਾਇਕ",
    langToggle: "ਭਾਸ਼ਾ",
    predictYield: "ਪੂਰਵ ਅਨੁਮਾਨ ਲਗਾਓ",
    predictDisease: "ਫਸਲ ਦੀ ਤਸਵੀਰ ਸਕੈਨ ਕਰੋ",
    resultsHeading: "ਏਆਈ ਨਿਦਾਨ ਨਤੀਜੇ",
    yieldResultsHeading: "ਅਨੁਮਾਨਿਤ ਉਪਜ",
    treatmentAdvice: "ਇਲਾਜ ਅਤੇ ਕੀਟਨਾਸ਼ਕ",
    climateImpact: "ਜਲਵਾਯੂ ਪਰਿਵਰਤਨ ਪ੍ਰਭਾਵ",
    cropType: "ਫਸਲ ਦੀ ਕਿਸਮ",
    districtState: "ਜ਼ਿਲ੍ਹਾ / ਰਾਜ",
    soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    rainfall: "ਵਰਖਾ (ਮਿਲੀਮੀਟਰ)",
    temperature: "ਤਾਪਮਾਨ (°C)",
    humidity: "ਨਮੀ (%)",
    ndvi: "ਐਨਡੀਵੀਆਈ ਸੂਚਕਾਂਕ",
    askVoice: "ਏਆਈ ਸਹਾਇਕ ਤੋਂ ਪੁੱਛੋ",
    listening: "ਸੁਣ ਰਹੇ ਹਾਂ...",
    transcript: "ਤੁਹਾਡੀ ਆਵਾਜ਼:",
    speakPrompt: "ਬੋਲਣ ਲਈ ਮਾਈਕ 'ਤੇ ਟੈਪ ਕਰੋ"
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const t = TRANSLATIONS[lang];

  // Forms State for Advanced Yield
  const [yieldInputs, setYieldInputs] = useState({
    crop: "Wheat",
    district_state: "Ludhiana, Punjab",
    soil: "Alluvial Soil",
    rainfall: 120.0,
    temperature: 32.0,
    humidity: 65.0,
    ndvi: 0.65
  });
  const [yieldResult, setYieldResult] = useState(null);
  const [yieldLoading, setYieldLoading] = useState(false);
  const [yieldError, setYieldError] = useState("");

  // Forms State for Multi-Disease
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectedDiseases, setDetectedDiseases] = useState([]);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [diseaseError, setDiseaseError] = useState("");

  // State for Smart Recommendations & Predictive Alerts
  const [recInputs, setRecInputs] = useState({
    crop: "Wheat",
    soil: "Alluvial Soil",
    temperature: 36.0,
    rainfall: 40.0
  });
  const [recResult, setRecResult] = useState(null);
  const [recLoading, setRecLoading] = useState(false);

  // State for Context Voice Assistant
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [voiceResponse, setVoiceResponse] = useState("");

  const handleYieldChange = (e) => {
    const { name, value } = e.target;
    setYieldInputs({ ...yieldInputs, [name]: value });
  };

  const submitAdvancedYield = async (e) => {
    e.preventDefault();
    setYieldLoading(true);
    setYieldError("");
    setYieldResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/yield/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...yieldInputs,
          rainfall: parseFloat(yieldInputs.rainfall),
          temperature: parseFloat(yieldInputs.temperature),
          humidity: parseFloat(yieldInputs.humidity),
          ndvi: parseFloat(yieldInputs.ndvi)
        })
      });

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const data = await response.json();
      setYieldResult(data);
    } catch (err) {
      setYieldError("Prediction failed. Ensure the advanced yield backend is running.");
    } finally {
      setYieldLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectedDiseases([]);
      setDiseaseError("");
    }
  };

  const scanMultiDisease = async () => {
    if (!selectedFile) {
      setDiseaseError("Please upload or drag a leaf photo.");
      return;
    }

    setDiseaseLoading(true);
    setDiseaseError("");
    setDetectedDiseases([]);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/disease/predict", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Diagnosis failed.");
      }

      const data = await response.json();
      setDetectedDiseases(data.detected_diseases || []);
    } catch (err) {
      setDiseaseError("Multi-label scan error. Verify backend availability.");
    } finally {
      setDiseaseLoading(false);
    }
  };

  const submitRecommendations = async (e) => {
    e.preventDefault();
    setRecLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/recommendations/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...recInputs,
          temperature: parseFloat(recInputs.temperature),
          rainfall: parseFloat(recInputs.rainfall)
        })
      });
      const data = await response.json();
      setRecResult(data);
    } catch (err) {
      alert("Failed to fetch recommendation insights.");
    } finally {
      setRecLoading(false);
    }
  };

  const triggerVoiceContext = () => {
    setIsListening(true);
    setVoiceQuery("");
    setVoiceResponse("");

    setTimeout(() => {
      setIsListening(false);
      const query = lang === 'hi'
        ? "कल बारिश होगी?"
        : lang === 'pa'
        ? "ਕੀ ਕੱਲ੍ਹ ਮੀਂਹ ਪਵੇਗਾ?"
        : "Will it rain tomorrow?";

      setVoiceQuery(query);

      const resp = lang === 'hi'
        ? "कल 10-15 मिमी हल्की वर्षा होने की संभावना है। आपको सिंचाई कम करने की सलाह दी जाती है।"
        : lang === 'pa'
        ? "ਕੱਲ੍ਹ 10-15 ਮਿਲੀਮੀਟਰ ਹਲਕੀ ਵਰਖਾ ਹੋਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਤੁਹਾਨੂੰ ਸਿੰਚਾਈ ਘਟਾਉਣ ਦੀ ਸਲਾਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।"
        : "Light showers of 10-15mm expected tomorrow. You are advised to suspend manual irrigation.";

      setVoiceResponse(resp);
    }, 2800);
  };

  return (
    <div className="agri-app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          🌾 Agri<span>AI</span>+
        </div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            📊 {t.navDashboard}
          </div>
          <div className={`nav-item ${activeTab === 'disease' ? 'active' : ''}`} onClick={() => setActiveTab('disease')}>
            🔬 {t.navDisease}
          </div>
          <div className={`nav-item ${activeTab === 'yield' ? 'active' : ''}`} onClick={() => setActiveTab('yield')}>
            🚜 {t.navYield}
          </div>
          <div className={`nav-item ${activeTab === 'rec' ? 'active' : ''}`} onClick={() => setActiveTab('rec')}>
            💡 {t.navRec}
          </div>
          <div className={`nav-item ${activeTab === 'voice' ? 'active' : ''}`} onClick={() => setActiveTab('voice')}>
            🎙 {t.navVoice}
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </div>
          <div className="lang-selector">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
            <button className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हिंदी</button>
            <button className={`lang-btn ${lang === 'pa' ? 'active' : ''}`} onClick={() => setLang('pa')}>ਪੰਜਾਬੀ</button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-view prediction-section">
            <div className="widgets-grid">
              <div className="card">
                <div className="widget-header">
                  <h3>🛰 Regional Satellite Health</h3>
                  <span className="result-badge">Google Earth Engine</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>NDVI Index: 0.68</span>
                  <span style={{ color: 'var(--text-secondary)' }}>Status: Active vegetation growth, healthy canopy detected.</span>
                </div>
              </div>

              <div className="card">
                <div className="widget-header">
                  <h3>🔮 Regional Insights</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)' }}>
                  <span>📈 Regional Yield Mean: <strong>4100 kg/ha</strong></span>
                  <span>🦠 Dominant Strain: <strong>Leaf Rust</strong></span>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginTop: '12px' }}>
              <div className="widget-header">
                <h3>🚀 Enterprise Platform Quick Access</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <button className="btn-primary" onClick={() => setActiveTab('disease')}>Attention-Based Multi-Disease Scan</button>
                <button className="btn-primary" onClick={() => setActiveTab('yield')}>Hybrid Yield Prediction</button>
                <button className="btn-primary" onClick={() => setActiveTab('rec')}>Predictive Alerts Engine</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'disease' && (
          <div className="disease-view prediction-section">
            <div className="two-col-layout">
              <div className="card">
                <h3>🔍 Multi-Label Disease Diagnosis</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Scan multiple diseases in one click using spatial and channel attention mechanisms.</p>
                
                <div className="upload-zone">
                  <div className="upload-icon">📸</div>
                  <p>Drag or upload multiple leaf crops (Supported: wheat, rice, maize, potato)</p>
                  <input type="file" accept="image/*" className="hidden-file-input" onChange={handleFileChange} />
                </div>

                {previewUrl && (
                  <div className="preview-box">
                    <span>Uploaded leaf preview:</span>
                    <img src={previewUrl} className="preview-img" alt="Uploaded leaf" />
                    <button className="btn-primary" onClick={scanMultiDisease} disabled={diseaseLoading}>
                      {diseaseLoading ? "Analyzing patterns..." : t.predictDisease}
                    </button>
                  </div>
                )}
                {diseaseError && <p style={{ color: '#f87171' }}>{diseaseError}</p>}
              </div>

              {detectedDiseases.length > 0 && (
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <h3>✅ {t.resultsHeading}</h3>
                  <div className="results-grid" style={{ gap: '20px' }}>
                    {detectedDiseases.map((item, i) => (
                      <div key={i} style={{ borderBottom: '1px solid rgba(16,185,129,0.1)', paddingBottom: '14px' }}>
                        <div className="results-row" style={{ marginBottom: '8px' }}>
                          <strong>Detected Pattern:</strong>
                          <span className="result-badge">{item.disease}</span>
                        </div>
                        <div className="results-row" style={{ marginBottom: '12px' }}>
                          <strong>Attention Score:</strong>
                          <span>{(item.confidence * 100).toFixed(2)}%</span>
                        </div>
                        <p style={{ color: '#34d399', fontStyle: 'italic' }}>
                          {lang === 'hi' ? item.hindi : lang === 'pa' ? item.punjabi : item.treatment}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Targeted Pesticides: {item.pesticides}
                        </p>
                        <div className="explainability-box" style={{ marginTop: '12px' }}>
                          <span>Explainability Feature Region:</span>
                          <img src={item.grad_cam} className="cam-img" alt="Class CAM" style={{ maxHeight: '180px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'yield' && (
          <div className="yield-view prediction-section">
            <div className="two-col-layout">
              <div className="card">
                <h3>🌾 Hybrid Forecast Metrics</h3>
                <form onSubmit={submitAdvancedYield} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>{t.cropType}</label>
                      <select className="form-control" name="crop" value={yieldInputs.crop} onChange={handleYieldChange}>
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Potato</option>
                        <option>Maize</option>
                        <option>Tomato</option>
                        <option>Mustard</option>
                        <option>Sugarcane</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t.districtState}</label>
                      <input type="text" className="form-control" name="district_state" value={yieldInputs.district_state} onChange={handleYieldChange} />
                    </div>
                    <div className="form-group">
                      <label>{t.soilType}</label>
                      <select className="form-control" name="soil" value={yieldInputs.soil} onChange={handleYieldChange}>
                        <option>Alluvial Soil</option>
                        <option>Black Soil</option>
                        <option>Red Soil</option>
                        <option>Clayey</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>{t.rainfall}</label>
                      <input type="number" className="form-control" name="rainfall" value={yieldInputs.rainfall} onChange={handleYieldChange} />
                    </div>
                    <div className="form-group">
                      <label>{t.temperature}</label>
                      <input type="number" className="form-control" name="temperature" value={yieldInputs.temperature} onChange={handleYieldChange} />
                    </div>
                    <div className="form-group">
                      <label>{t.humidity}</label>
                      <input type="number" className="form-control" name="humidity" value={yieldInputs.humidity} onChange={handleYieldChange} />
                    </div>
                    <div className="form-group">
                      <label>{t.ndvi}</label>
                      <input type="number" step="0.01" className="form-control" name="ndvi" value={yieldInputs.ndvi} onChange={handleYieldChange} />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" disabled={yieldLoading}>
                    {yieldLoading ? "Executing hybrid prediction..." : t.predictYield}
                  </button>
                  {yieldError && <p style={{ color: '#f87171' }}>{yieldError}</p>}
                </form>
              </div>

              {yieldResult && (
                <div className="card">
                  <h3>🚜 {t.yieldResultsHeading}</h3>
                  <div style={{ marginTop: '16px' }}>
                    <span className="yield-res-num">{yieldResult.predicted_yield} kg/ha</span>
                    <p className="yield-bounds">
                      Prediction Range: <strong>{yieldResult.lower_bound} - {yieldResult.upper_bound} kg/ha</strong>
                    </p>
                  </div>

                  <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    <h4>🌍 {t.climateImpact}</h4>
                    <p style={{ color: '#fca5a5', fontStyle: 'italic', marginTop: '4px' }}>{yieldResult.climate_impact}</p>
                  </div>

                  <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    <h4>💡 Dynamic Recommendations</h4>
                    <div className="rec-list">
                      {yieldResult.recommendations.map((rec, i) => (
                        <div className="rec-item" key={i}>{rec}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rec' && (
          <div className="rec-view prediction-section">
            <div className="two-col-layout">
              <div className="card">
                <h3>💡 Predictive Alerts Engine</h3>
                <form onSubmit={submitRecommendations} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label>{t.cropType}</label>
                    <select className="form-control" value={recInputs.crop} onChange={(e) => setRecInputs({ ...recInputs, crop: e.target.value })}>
                      <option>Wheat</option>
                      <option>Rice</option>
                      <option>Maize</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.soilType}</label>
                    <select className="form-control" value={recInputs.soil} onChange={(e) => setRecInputs({ ...recInputs, soil: e.target.value })}>
                      <option>Alluvial Soil</option>
                      <option>Black Soil</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.temperature}</label>
                    <input type="number" className="form-control" value={recInputs.temperature} onChange={(e) => setRecInputs({ ...recInputs, temperature: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{t.rainfall}</label>
                    <input type="number" className="form-control" value={recInputs.rainfall} onChange={(e) => setRecInputs({ ...recInputs, rainfall: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={recLoading}>Generate Advice</button>
                </form>
              </div>

              {recResult && (
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3>✅ Real-Time Advice Results</h3>
                  <div>
                    <strong>💧 Suggested Irrigation Schedule:</strong>
                    <p style={{ color: '#34d399', fontSize: '1.05rem', marginTop: '4px' }}>{recResult.irrigation_schedule}</p>
                  </div>
                  <div>
                    <strong>💊 Dynamic Fertilizers Suggestion:</strong>
                    <p style={{ color: '#34d399', fontSize: '1.05rem', marginTop: '4px' }}>{recResult.fertilizers}</p>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(16,185,129,0.15)', paddingTop: '12px' }}>
                    <strong>🔮 Forecasting Predictive Alerts:</strong>
                    <div style={{ marginTop: '8px' }}>
                      {recResult.predictive_alerts.map((alert, i) => (
                        <div className="rec-item" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#fca5a5' }} key={i}>{alert}</div>
                      ))}
                    </div>
                  </div>
                  {recResult.foundational_insight && (
                    <div style={{ borderTop: '1px solid rgba(16,185,129,0.15)', paddingTop: '12px' }}>
                      <strong>🤖 2B Foundational Model Insight:</strong>
                      <p style={{ color: '#60a5fa', fontSize: '1.02rem', marginTop: '6px' }}>{recResult.foundational_insight}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="voice-view prediction-section">
            <div className="card voice-assistant">
              <h3>🎙 {t.askVoice}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Get context-aware audio responses on farming schedules</p>

              <div className="voice-wave">
                {isListening ? (
                  <>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-secondary)' }}>{t.speakPrompt}</span>
                )}
              </div>

              <button className={`voice-mic-btn ${isListening ? 'active' : ''}`} onClick={triggerVoiceContext}>
                🎤
              </button>

              {voiceQuery && (
                <div className="voice-output">
                  <div className="voice-transcript">
                    <strong>{t.transcript}</strong> {voiceQuery}
                  </div>
                  <div style={{ color: '#34d399', fontSize: '1.15rem', fontWeight: '500' }}>
                    🌟 {voiceResponse}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
