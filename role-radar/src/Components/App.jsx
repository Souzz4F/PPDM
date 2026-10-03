function App(){
    const estiloSubtitulo = {
        color: '#8b003a',
        fontFamily: 'Monocraft, sans-serif',
        fontSize: '1.25rem',
        marginTop: '0px'
    };


function obterAno(){
    return new Date().getFullYear();
}

return(
    <div>
    <h1 className="titulo">RolêRadar</h1>
    <p style={estiloSubtitulo}>Descubra o que existe perto de você!</p>
    <footer>
    <p>RolêRadar. &copy; {obterAno()}</p>
    </footer>
    </div>
);
}

export default App;