import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { send } from 'emailjs-com';
import Input from '../elements/Input';
import Button from '../elements/Button';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );  

  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      'service_3pd23jx',
      'template_ojzv2re',
      toSend,
      'Tb2HHiVyohbTUYzlY'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };


  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="cta-slogan">
            <h3 className="m-0">
              Join our waitlist today!
              </h3>
          </div>

          <form onSubmit={onSubmit}>
            <input
              type='text'
              name='from_name'
              placeholder='Name'
              value={toSend.from_name}
              onChange={handleChange}
              />
            <input
              type='text'
              name='from_email'
              placeholder='Email'
              value={toSend.from_email}
              onChange={handleChange}
            />
            {/* <button type = 'submit'>Submit</button> */}
            <div>
              <Button tag ='a' type = 'submit' color = 'dark' wideMobile>Submit</Button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;