import './Spinner.component.css';

const Spinner = ({ className = '' }) => {
    return (
        <div className={`spinner-container ${className}`}>
            <div className='spinner'></div>
        </div>
    );
}

export default Spinner;