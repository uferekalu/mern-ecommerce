import React from 'react'
import TextField  from '@material-ui/core/TextField'


export default function Input(props) {

    const { label, name, value, onChange, ...other  } = props;

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
        />
    )
}
