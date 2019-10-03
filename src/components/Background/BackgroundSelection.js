import React, { Component } from 'react';

import Scene1 from '../../assets/screens/screen1.jpg';
import Scene2 from '../../assets/screens/screen2.jpg';
import Scene3 from '../../assets/screens/screen3.jpg';
import Scene4 from '../../assets/screens/screen4.jpg';
import Scene5 from '../../assets/screens/screen5.jpg';
import Scene6 from '../../assets/screens/screen6.jpg';
import Scene7 from '../../assets/screens/screen7.jpg';
import Scene8 from '../../assets/screens/screen8.jpg';
import Scene9 from '../../assets/screens/screen9.jpg';

let backgrounds = {
    Colors: ['#3D348B', '#7678ED', '#F7B801', '#F18701', '#F35B04', '#119DA4', '#19647E'],
    Images: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9]
}

class BackgroundSelection extends Component {
    state = {}


    render() {
        return (
            <div>
                <div className={this.props.colorMenu ? 'background-options-main' : 'background-options-main hidden'}>
                    {
                        backgrounds.Colors.map((newBackground) =>
                            <div className="background-options" key={newBackground}>
                                <div className="background-option-wrapper">
                                    <div
                                        style={{ backgroundColor: `${newBackground}` }}
                                        className="background-options background-option"
                                        onClick={() => { this.props.handleBackgroundChange(newBackground) }}
                                        >
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
                <div className={this.props.imageMenu ? 'background-options-main' : 'background-options-main hidden'}>
                    {backgrounds.Images.map(newBackground =>
                        <div className="background-options" key={newBackground}>
                            <div className="background-option-wrapper">
                                <div
                                    style={{ backgroundImage: `url(${newBackground})` }}
                                    className="background-options background-option"
                                    onClick={() => { this.props.handleBackgroundChange(newBackground) }}>
                                    
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        )
    }

}

export default BackgroundSelection;
