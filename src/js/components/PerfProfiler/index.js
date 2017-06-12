/**
 * Created by mlo on 09.06.2017.
 */
import React from 'react';
import Perf from 'react-addons-perf';
import styles from './styles.css';

class PerfProfiler extends React.Component {
    constructor(props) {
        super(props);

        this.state = { started: false };
    }

    toggle = () => {
        const { started } = this.state;

        started ? Perf.stop() : Perf.start();

        this.setState({ started: !started });
    }

    printWasted = () => {
        const lastMeasurements = Perf.getLastMeasurements();

        Perf.printWasted(lastMeasurements);
    }

    printOperations = () => {
        const lastMeasurements = Perf.getLastMeasurements();

        Perf.printOperations(lastMeasurements);
    }

    printInclusive = () => {
        const lastMeasurements = Perf.getLastMeasurements();

        Perf.printInclusive(lastMeasurements);
    }

    printExclusive = () => {
        const lastMeasurements = Perf.getLastMeasurements();

        Perf.printExclusive(lastMeasurements);
    }

    render() {
        const { started } = this.state;

        return <div className={styles.perfProfiler}>
            <h1>Performance Profiler</h1>
            <button onClick={this.toggle}>{started ? 'Stop' : 'Start'}</button>
            <button onClick={this.printWasted}>Print Wasted</button>
            <button onClick={this.printOperations}>Print Operations</button>
            <button onClick={this.printInclusive}>Print Inclusive</button>
            <button onClick={this.printExclusive}>Print Exclusive</button>
        </div>;
    }
}

export default PerfProfiler;