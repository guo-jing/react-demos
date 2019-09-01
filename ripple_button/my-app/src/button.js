import React from 'react';
import './button.css'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
        this.useRipple = this.props.className.split(' ').indexOf('ripple') !== -1;
        this.state = {
            showRipple: false,
            ripplePosition: {x: 0, y: 0}
        };
    }

    ripple(event) {
        const x = event.clientX;
        const y = event.clientY;
        const {top, left} = this.buttonRef.current.getBoundingClientRect();
        this.setState({
            showRipple: true,
            ripplePosition: {x: x - left, y: y - top}
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                showRipple: false
            });
        }, 800)
    }

    render() {
        return (
            <div className='button-wrap'>
                <button
                    className='button'
                    onClick={this.ripple.bind(this)}
                    ref={this.buttonRef}>
                    <span className='text'>{this.props.children}</span>
                </button>
                {this.useRipple && this.state.showRipple
                    ? <span className={'ripple'}
                            style={{
                                left: this.state.ripplePosition.x,
                                top: this.state.ripplePosition.y
                            }}>
                    </span>
                    : ''}
            </div>
        );
    }
}

export default Button