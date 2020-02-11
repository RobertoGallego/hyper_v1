import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button, GhostInput } from "./styledComponents"
import RecoverPasswordStyles from "./RecoverPassword.styles"
import axios from "axios"
import { useTranslation } from 'react-i18next';

class RecoverPassword extends Component {
  state = {
    email: "",
    submitted: false
  }
  handleChange = e => {
    this.setState({ email: e.target.value })
  }
  sendPasswordResetEmail = e => {
    e.preventDefault()
    const { email } = this.state
    axios.post(`http://localhost:3000/reset_password/user/${email}`)
    this.setState({ email: "", submitted: true })
  }
  render() {
    const { t } = useTranslation();
    const { email, submitted } = this.state
    return (
      <RecoverPasswordStyles>
        <h3>{t('login.rPW.title')}</h3>
        {submitted ? (
          <div className="reset-password-form-sent-wrapper">
            <p>
              {t('login.rPW.p1')}
            </p>
            <Link to="/login" className="ghost-btn">
              {t('login.rPW.return')}
            </Link>
          </div>
        ) : (
          <div className="reset-password-form-wrapper">
            <p>
              {t('login.rPW.p2')}
            </p>
            <form onSubmit={this.sendPasswordResetEmail}>
              <GhostInput
                onChange={this.handleChange}
                value={email}
                placeholder={t('email')}
              />
              <Button className="btn-primary password-reset-btn">
                {t('login.rPW.send')}
              </Button>
            </form>
            <Link to="/login">{t('login.rPW.return')}</Link>
          </div>
        )}
      </RecoverPasswordStyles>
    )
  }
}
export default RecoverPassword