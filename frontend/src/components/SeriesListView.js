import SerieItem from "./Series";
import React from "react";


function SerieView(props) {
    return (
        <div>
            <ul>
                {props.seriesList.map(serie => <SerieItem serie={serie}
                    />)}
            </ul>
        </div>
    )
}

export default SerieView;