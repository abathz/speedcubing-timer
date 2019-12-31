import React, { Component, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

interface OwnProps {
    onSpaceBar?: (data: { time: string }) => any;
}
interface StateProps {}
// type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type PropsComponent = OwnProps & StateProps;
interface StateComponent {
    elapsedTimeToString: string;
    isTimerRun: boolean;
}

const TextTimer = styled.span`
    font-size: 200pt;
    font-weight: bold;
`;

class Timer extends Component<PropsComponent, StateComponent> {
    private timer: any;

    constructor(props: PropsComponent) {
        super(props);

        this.state = {
            elapsedTimeToString: '0.0',
            isTimerRun: false
        };

        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', event => {
                if (event.keyCode === 32) {
                    this.onSpacebarTapped();
                }
            });
        }
    }

    onSpacebarTapped = () => {
        const { isTimerRun, elapsedTimeToString } = this.state;
        if (this.props.onSpaceBar) {
            if (isTimerRun) {
                this.stopTimer();
                this.setState({ isTimerRun: false });
                this.props.onSpaceBar({ time: elapsedTimeToString });
            } else {
                this.startTimer();
                this.setState({ isTimerRun: true });
            }
        }
    };

    startTimer = () => {
        const startTime = Date.now();
        this.timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const elapsedTimeToString = (elapsedTime / 1000).toFixed(3);
            this.setState({ elapsedTimeToString });
        }, 50);
    };

    stopTimer = () => {
        clearInterval(this.timer);
    };

    render() {
        const { elapsedTimeToString } = this.state;
        return (
            <div onKeyUp={this.onSpacebarTapped}>
                <TextTimer>{elapsedTimeToString}</TextTimer>
            </div>
        );
    }
}

export default Timer;
