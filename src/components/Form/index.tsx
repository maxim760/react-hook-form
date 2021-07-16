import React, { FormHTMLAttributes } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { WithChildren } from '../../types'

type FormProps = WithChildren<FormHTMLAttributes<any>>

const useStyles = makeStyles((theme) => ({
  root: { 
    width: "100%",
    marginTop: theme.spacing(1)
  }
}))

export const Form: React.FC<FormProps> = ({children, ...props }) => {
  const styles = useStyles()
  return (
    <form className={styles.root} noValidate {...props}>
      {children}
    </form>
  )
}