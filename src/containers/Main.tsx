import React, { Component, Fragment } from 'react';
import update from 'immutability-helper';
import Timer from 'components/common/Timer';
import { GitHub } from 'react-feather';

import styled from '@emotion/styled';

interface OwnProps {}
interface StateProps {}
// type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type PropsComponent = OwnProps & StateProps;
interface StateComponent {
    times: any[];
    onHover: boolean;
}

const Title = styled.h1`
    font-size: 56pt;
    color: palevioletred;
`;

class Main extends Component<PropsComponent, StateComponent> {
    constructor(props: PropsComponent) {
        super(props);

        this.state = {
            times: [],
            onHover: false
        };
    }

    onSpaceBarTapped = (data: any) => {
        const newState = update(this.state, {
            times: { $push: [data.time] }
        });

        this.setState(newState);
    };

    get renderListTimes() {
        const { times } = this.state;

        return times.map((data: string, index: number) => (
            <li key={index} className='list-group-item'>
                {data}s
            </li>
        ));
    }

    get bestTime() {
        const { times } = this.state;

        const stringToNumber: number[] = times.map(data => Number(data));
        const time: number = Math.min(...stringToNumber);

        return times.length > 0 ? time.toFixed(3) : '0';
    }

    get worstTime() {
        const { times } = this.state;

        const stringToNumber: number[] = times.map(data => Number(data));
        const time: number = Math.max(...stringToNumber);

        return times.length > 0 ? time.toFixed(3) : '0';
    }

    get averageTime() {
        const { times } = this.state;

        const time: number = times.reduce((a, b) => Number(a) + Number(b), 0) / times.length;

        return times.length > 0 ? time.toFixed(3) : '0';
    }

    render() {
        const { times, onHover } = this.state;

        return (
            <div className='container'>
                <div className='row text-center'>
                    <div className='col-12'>
                        <Title className='mb-3'>Speedcubing Timer</Title>
                    </div>
                </div>
                <div className='row text-center'>
                    <div className='col-12'>
                        <Timer onSpaceBar={this.onSpaceBarTapped} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-5'>
                        <table className='table table-bordered text-center'>
                            <thead>
                                <tr>
                                    <th className='text-success'>Best Time</th>
                                    <th className='text-danger'>Worst Time</th>
                                    <th className='text-info'>Average Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.bestTime}s</td>
                                    <td>{this.worstTime}s</td>
                                    <td>{this.averageTime}s</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col'>
                        <p className='font-weight-bold'>Time Record</p>
                        <ul className='list-group'>
                            {times.length > 0 ? (
                                this.renderListTimes
                            ) : (
                                <li className='list-group-item'>
                                    <span className='text-muted'>No time recorded</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='row mt-5 mb-3'>
                    <div className='col-12 text-center small'>
                        <div className='mb-2'>
                            <a href='https://github.com/abathz/speedcubing-timer' target='_blank'>
                                <GitHub
                                    style={{ cursor: 'pointer' }}
                                    size={20}
                                    color={onHover ? '#a1a1a1' : '#ccc'}
                                    onMouseEnter={() => this.setState({ onHover: true })}
                                    onMouseLeave={() => this.setState({ onHover: false })}
                                />
                            </a>
                        </div>
                        <div className='text-muted'>Copyright © Adli Fariz Bonaputra, 2020.</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
