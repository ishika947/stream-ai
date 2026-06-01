import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, Activity, Layers, Database, ShieldAlert, 
  Radio, LogOut, ShieldCheck, AlertTriangle, Play, Pause, Flame, Sun, Moon 
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function Dashboard({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  
  const [isLive, setIsLive] = useState(true);
  const [totalEvents, setTotalEvents] = useState(48250);
  const [sqsCount, setSqsCount] = useState(4);
  const [alerts, setAlerts] = useState([]);
  const [liveLogs, setLiveLogs] = useState([
    { id: 1, time: "16:20:01", msg: "⚡ Cloud System Connected. Listening to Apache Kafka streams...", status: "ok" }
  ]);
  const [chartData, setChartData] = useState(() =>
    Array.from({ length: 7 }, (_, i) => ({ name: `16:${10+i}`, traffic: 45 + Math.floor(Math.random()*20) }))
  );

  const logsEndRef = useRef(null);
  
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [liveLogs]);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString();
      const amt = Math.floor(Math.random() * 92000) + 1000;
      const nodes = ["Indore-HQ", "AWS-West", "Mumbai-Gateway", "Delhi-Edge"];
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      
      setTotalEvents(prev => prev + Math.floor(Math.random() * 6) + 2);
      setSqsCount(Math.floor(Math.random() * 9) + 2);

      const isAnomaly = amt > 80000;
      let msg = `Incoming event parsed at ${randomNode} - Buffer secure.`;
      let status = "ok";

      if (isAnomaly) {
        msg = `⚠️ HIGH VALUE CAPTURED: Transaction threshold flag at ${randomNode} - Value: ₹${amt}`;
        status = "alert";
        setAlerts(prev => [{
          id: Date.now(), time: timeStr, loc: randomNode, amount: amt, reason: "AI Core flagged transactional velocity limits."
        }, ...prev].slice(0, 8));
      }

      setLiveLogs(prev => [...prev, { id: Date.now(), time: timeStr, msg, status }].slice(-15));
      setChartData(prev => [...prev.slice(1), { name: timeStr.substring(0, 5), traffic: Math.floor(Math.random() * 45) + 40 }]);

    }, 1600);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleTriggerAttack = () => {
    const timeStr = new Date().toLocaleTimeString();
    setSqsCount(98);
    setLiveLogs(prev => [
      ...prev,
      { id: Date.now(), time: timeStr, msg: "🔥 CRITICAL ALERT: DDOS / PATTERN INJECTION ATTACK DETECTED!", status: "alert" }
    ]);
    setAlerts(prev => [
      { id: Date.now(), time: timeStr, loc: "CRITICAL SYSTEM", amount: 999999, reason: "Unauthorized API brute-force sequence." },
      { id: Date.now()+1, time: timeStr, loc: "GATEWAY REJECT", amount: 850000, reason: "High-density payload spike." },
      ...prev
    ].slice(0, 8));
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#0B0F19]' : 'bg-gray-50'}`}>
      
      <nav className={`border-b px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 shadow-md transition-colors duration-300 ${
        isDark ? 'bg-[#1E2538] border-gray-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-200'
      }`}>
        <button
          type="button"
          onClick={() => navigate('/')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { navigate('/'); } }}
          className="flex min-h-11 w-full sm:w-auto items-center gap-3 focus:outline-none"
          aria-label="Go to Home"
        >
          <Cpu className={`w-7 h-7 text-indigo-500 ${isLive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <div>
            <h1 className={`text-sm sm:text-md font-extrabold tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>
              LiveOps Analytics Console
            </h1>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <span className={`w-2 h-2 rounded-full inline-block ${isLive ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
              {isLive ? 'Live Stream Active' : 'Pipeline Paused'}
            </p>
          </div>
        </button>

        <div className="flex w-full sm:w-auto flex-wrap items-center gap-2 sm:gap-3">
          <button onClick={toggleTheme} className={`min-h-11 min-w-11 p-2 rounded-lg border transition-all cursor-pointer ${isDark ? 'border-gray-600 bg-gray-800/80 text-yellow-400 hover:bg-gray-700' : 'border-gray-200 bg-gray-100 text-indigo-600'}`}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          

          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex min-h-11 flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isLive ? 'border-amber-600 text-amber-500 hover:bg-amber-500/10' : 'border-emerald-600 text-emerald-500 hover:bg-emerald-500/10'
            }`}
          >
            {isLive ? <><Pause className="w-3 h-3" /> Pause Ingestion</> : <><Play className="w-3 h-3" /> Resume Stream</>}
          </button>

          <button 
            onClick={handleTriggerAttack}
            className="flex min-h-11 flex-1 sm:flex-none items-center justify-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold px-3 py-2 rounded-lg text-xs shadow-md shadow-red-900/20 cursor-pointer active:scale-95"
          >
            <Flame className="w-3 h-3 text-yellow-300 fill-current animate-bounce" /> Inject Mock Threat
          </button>

          <button onClick={() => navigate('/')} className={`flex min-h-11 flex-1 sm:flex-none items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs border cursor-pointer transition-all ${isDark ? 'border-gray-700 text-gray-300 bg-gray-800/40 hover:bg-red-950/30 hover:text-red-400 hover:border-red-900/50' : 'border-gray-200 text-gray-600 hover:bg-red-50'}`}>
            <LogOut className="w-3 h-3" /> Disconnect
          </button>
        </div>
      </nav>

      <div className="p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 flex-grow overflow-visible xl:overflow-hidden xl:h-[calc(100vh-65px)]">
        
        <div className="xl:col-span-3 flex flex-col gap-4 sm:gap-5 min-h-0 xl:h-full xl:overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
            
            <div className={`border p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-[#161B26] border-gray-800/80' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-semibold uppercase">Kafka Pipelines</p>
                <h3 className={`text-xl font-black mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalEvents.toLocaleString()}</h3>
              </div>
              <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500"><Radio className="w-5 h-5" /></div>
            </div>

            <div className={`border p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-[#161B26] border-gray-800/80' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-semibold uppercase">AWS SQS Queues</p>
                <h3 className={`text-xl font-black mt-0.5 ${sqsCount > 50 ? 'text-red-500 font-bold' : 'text-sky-500'}`}>{sqsCount}</h3>
              </div>
              <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400"><Layers className="w-5 h-5" /></div>
            </div>

            <div className={`border p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-[#161B26] border-gray-800/80' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-semibold uppercase">AI Analysis Engine</p>
                <h3 className={`text-lg sm:text-xl font-black mt-0.5 break-words ${sqsCount > 50 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>{sqsCount > 50 ? 'ALERT OVERLOAD' : 'SCANNING'}</h3>
              </div>
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400"><Activity className="w-5 h-5" /></div>
            </div>

            <div className={`border p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-[#161B26] border-gray-800/80' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-semibold uppercase">AWS S3 Lake Storage</p>
                <h3 className={`text-xl font-black text-gray-500 mt-0.5`}>ACTIVE</h3>
              </div>
              <div className="p-2.5 bg-gray-500/10 rounded-xl text-gray-500"><Database className="w-5 h-5" /></div>
            </div>
          </div>

          <div className={`border p-4 sm:p-5 rounded-xl flex-grow flex flex-col min-h-[18rem] xl:min-h-0 ${isDark ? 'bg-[#161B26] border-gray-800/80' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h2 className="text-xs font-bold text-gray-400 mb-2">Throughput Velocity Analysis (Events/Sec)</h2>
            <div className="w-full flex-grow min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={10} />
                  <YAxis stroke="#6B7280" fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="traffic" stroke="#4F46E5" strokeWidth={2.5} dot={{ fill: '#38BDF8', r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`font-mono text-[11px] p-3 rounded-xl h-48 sm:h-40 flex flex-col justify-between flex-shrink-0 ${isDark ? 'bg-gray-950 border border-gray-900' : 'bg-gray-900 text-gray-200'}`}>
            <div className="text-gray-500 border-b border-gray-800 pb-1.5 mb-1.5 flex flex-col sm:flex-row justify-between gap-1 flex-shrink-0">
              <span>SYSTEM CONTROL LOGS PIPELINE FEED</span>
              <span className={isLive ? 'text-indigo-400 animate-pulse' : 'text-amber-500'}>{isLive ? '● INGESTING' : '■ PAUSED'}</span>
            </div>
            <div 
              className="overflow-y-auto flex-grow space-y-1 pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#374151 #030712' : '#D1D5DB #F3F4F6'
              }}
            >
              {liveLogs.map(log => (
                <div key={log.id} className={`flex flex-col sm:flex-row gap-1 sm:gap-2 ${log.status === 'alert' ? 'text-red-400 bg-red-950/20 border border-red-900/30 px-1 rounded' : 'text-gray-400'}`}>
                  <span className="shrink-0">[{log.time}]</span> <span className="flex-grow break-words">{log.msg}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        <div className={`border rounded-xl p-4 flex flex-col min-h-[22rem] xl:h-full overflow-hidden ${isDark ? 'bg-[#161B26] border-gray-800/80' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="border-b pb-3 mb-3 border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-2 text-red-500 font-bold">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-sm">AI Threat Scanner</h2>
            </div>
          </div>

          <div 
            className="flex-grow overflow-y-auto space-y-2.5 pr-1 max-h-[32rem] xl:max-h-[calc(100vh-160px)]"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isDark ? '#4B5563 #111827' : '#D1D5DB #F9FAFB'
            }}
          >
            {alerts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 py-32">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mb-2" />
                <p className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Core Secure</p>
                <p className={`text-[11px] mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No anomalies caught.</p>
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                  <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                    <span className="text-red-400 font-bold uppercase flex items-center gap-1"><AlertTriangle className="w-2.5 h-2.5" /> Warning Flag</span>
                    <span>{alert.time}</span>
                  </div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{alert.loc} Anomaly</h4>
                  <p className="text-xs text-red-400 font-semibold mt-0.5">Impact Weight: ₹{alert.amount.toLocaleString()}</p>
                  <p className={`text-[10px] mt-1 italic border-t pt-1 ${isDark ? 'border-gray-800/60 text-gray-400' : 'border-gray-200 text-gray-500'}`}>{alert.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
