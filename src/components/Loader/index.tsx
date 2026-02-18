function LoadingSpinner() {
    return (
        <div className="overlay-panel">
            <svg
                id="svg-spinner"
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 48 48"
            >
                <circle cx="24" cy="4" r="4" fill="#000" />
                <circle cx="12.19" cy="7.86" r="3.7" fill="#171717" />
                <circle cx="5.02" cy="17.68" r="3.4" fill="#2f2f2f" />
                <circle cx="5.02" cy="30.32" r="3.1" fill="#464646" />
                <circle cx="12.19" cy="40.14" r="2.8" fill="#5e5e5e" />
                <circle cx="24" cy="44" r="2.5" fill="#757575" />
                <circle cx="35.81" cy="40.14" r="2.2" fill="#8d8d8d" />
                <circle cx="42.98" cy="30.32" r="1.9" fill="#a4a4a4" />
                <circle cx="42.98" cy="17.68" r="1.6" fill="#bcbcbc" />
                <circle cx="35.81" cy="7.86" r="1.3" fill="#d3d3d3" />
            </svg>
        </div>
    );
};

export default LoadingSpinner;