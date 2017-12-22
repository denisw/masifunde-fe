import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import { isInvalid } from './utils'
import LabelButton from './LabelButton'
import ErrorMessage from './ErrorMessage'

const SubHeader = styled.h3`
  margin-bottom: 1.4rem;
  margin-top: 1rem;
`

const StyledErrorMessage = ErrorMessage.extend`
  margin-top: -0.4rem;
`

const DonationIntervalField = ({
  fieldName,
  title,
  intervals,
}) => (
  <Field name={fieldName}>
    {({ input, meta }) => (
      <Fragment>
        <SubHeader>{title}</SubHeader>
        <div className="row">
          <div className="offset-md-3 col-md-9 col-lg-7">
            {intervals.map(({ value, name }) => (
              <LabelButton
                className="btn"
                isActive={input.value === value}
                key={value}
                htmlFor={`frequencyInputOption${value}`}
              >
                <input
                  {...input}
                  type="radio"
                  value={value}
                  id={`frequencyInputOption${value}`}
                  autoComplete="off"
                />
                {name}
              </LabelButton>
            ))}
            {isInvalid(meta) ? <StyledErrorMessage>{meta.error}</StyledErrorMessage> : ''}
          </div>
        </div>
      </Fragment>
    )}
  </Field>
)

DonationIntervalField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  intervals: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

export default DonationIntervalField
