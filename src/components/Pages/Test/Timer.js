import React from "react";

export default function Timer () {
    const [seconds, setSeconds] = React.useState(10);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds('BOOOOM!');
        }
    },[seconds]);

    return (
        <div className="App">
            <div>
                {seconds}
            </div>
        </div>
    );
}