const Edges = ({ isDarkTheme, themeChanging }) => {
    const edgesClassName = `edges ${themeChanging ? 'edgesAnimation' : ''}`;

    return (
        <>
            <div id="edges" className={edgesClassName}>
                <div className="edge sx top"></div>
                <div className="edge sx bottom" style={{ transform: 'scaleY(-1)' }}></div>
                <div className="edge dx top" style={{ transform: 'rotate(90deg)' }}></div>
                <div className="edge dx bottom" style={{ transform: 'scaleY(-1) rotate(90deg)' }}></div>
            </div>
            <div className="divider"></div>
        </>
    );
};

export default Edges;