import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/phonebook/phonebook-actions'
import s from './Filter.module.css'

function Filter({value, onChange}) {
        return (
        <>
                <label className={s.label}>
                Find contacts by name
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className={s.input}/>
            </label>
        </>
    )
}

Filter.propTyper = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = state => ({
  value: state.phonebook.filter,
})

const mapDispatchToProps = dispatch => ({
  onChange: (e) => dispatch(actions.changeFilter(e.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)