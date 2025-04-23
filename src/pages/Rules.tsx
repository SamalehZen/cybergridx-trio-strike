
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Rules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>
      
      <main className="flex-1 container px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="cyber-button mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <div className="cyber-border p-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-cyber-cyan mb-6">SYSTEM PROTOCOL</h1>
          
          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-bold text-cyber-primary mb-2">LIMITED SYMBOL DEPLOYMENT</h2>
              <p>Each player is restricted to a maximum of 3 active symbols on the grid at any time. Strategic placement is crucial for victory.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-cyber-primary mb-2">SYMBOL ROTATION</h2>
              <p>When placing a 4th symbol, players must select one of their existing symbols to remove, enabling dynamic tactical adjustments.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-cyber-primary mb-2">VICTORY CONDITIONS</h2>
              <p>Achieve victory by aligning three of your symbols horizontally, vertically, or diagonally. The game ends immediately upon meeting this condition.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-cyber-primary mb-2">ALTERNATING TURNS</h2>
              <p>Players take turns placing their symbols. Strategic timing and position selection are key to outmaneuvering your opponent.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rules;
