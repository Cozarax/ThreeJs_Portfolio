import '../../styles/crt.css'; // 💡 Import uniquement ici, scope local

export default function CrtInterface({ onToggle }: { onToggle: () => void }) {
  return (
    <div id="crt-ui">
      <div className="crt">
        <div className="scanlines">
          <div className="content">
            <h1 className="title">Démarrage...</h1>
            
            <button onClick={onToggle}>Shut Down</button>
          </div>
        </div>
      </div>
    </div>
  );
}
