import React, { Component } from 'react';
import BackgroundSelection from './BackgroundSelection.js';

import './styles.css';
import Scene3 from '../../assets/screens/screen3.jpg';

class BackgroundType extends Component {


    state = {

    };

    renderBackgroundTypes = () => {
        if (this.props.colorMenu || this.props.imageMenu)
            return;
        else {
            return (
                <div className="background-types">
                    <button className="background-types-wrapper" onClick={this.props.toggleColorMenu}>
                        <div className="background-menu background-menu-colors">
                        </div>
                        <h3>Colors</h3>
                    </button>
                    <button className="background-types-wrapper" onClick={this.props.toggleImageMenu}>
                        <div className="background-menu background-menu-images" style={{ backgroundImage: `url(${Scene3})` }}>
                        </div>
                        <h3>Photos</h3>
                    </button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className={this.props.changeBackground ? 'background-menu-main' : 'background-menu hidden'}>
                <BackgroundSelection
                    colorMenu={this.props.colorMenu}
                    imageMenu={this.props.imageMenu}
                handleBackgroundChange={this.props.handleBackgroundChange}
                />
               {this.renderBackgroundTypes()}

            </div>
        )
    }
}

export default BackgroundType;