
import CyberGridX from "../components/CyberGridX";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline effect for cyberpunk feel */}
      <div className="scanline"></div>
      
      <main className="flex-1 container px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-primary mb-2">
            TEAM ISKUDAYS
          </h1>
          <p className="text-white/70 text-sm md:text-base">TRIO-STRIKE TACTICAL GRID SYSTEM</p>
        </header>
        
        <div className="mb-8 cyber-border p-4 text-sm">
          <h2 className="text-center font-bold text-cyber-cyan mb-2">SYSTEM PROTOCOL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div>
              <p className="mb-1 text-cyber-primary">✧ LIMITED SYMBOL DEPLOYMENT</p>
              <p>Maximum 3 active symbols per player</p>
            </div>
            <div>
              <p className="mb-1 text-cyber-primary">✧ SYMBOL ROTATION</p>
              <p>Placing a 4th symbol removes the oldest one</p>
            </div>
            <div>
              <p className="mb-1 text-cyber-primary">✧ VICTORY CONDITIONS</p>
              <p>Three aligned symbols activates victory</p>
            </div>
            <div>
              <p className="mb-1 text-cyber-primary">✧ ALTERNATING TURNS</p>
              <p>Players take turns placing symbols</p>
            </div>
          </div>
        </div>
        
        <CyberGridX />
        
        <footer className="text-center mt-12 text-white/50 text-sm">
          <p>© 2077 CyberGridX Corporation • NeoTokyo District</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
