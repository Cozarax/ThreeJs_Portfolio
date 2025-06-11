import '../../styles/crt.css'; // 💡 Import uniquement ici, scope local

export default function CrtInterface() {
// { onToggle }: { onToggle: () => void }
  return (
    <div>
      <div className="crt glitch-appear">
        <div>
          <div className="content">
            <h1 className="title pseudoGlitch" data-text="Démarrage…">
              
            </h1>

            {/* <button onClick={onToggle}>Shut Down</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
