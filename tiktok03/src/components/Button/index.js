import styles from './Button.module.scss'
import clsx from 'clsx'

function Button({ primary }) {

    const classes = clsx(styles.btn,'d-flex', { 
        [styles.primary] : primary
    })
    return (
        <>
            <button className={classes}>
                Click me !
            </button>
            <button className={clsx(styles.btn, {
                [styles.active] : true
            })}>
                Click me !
            </button>
            {/* <button className={`${styles.btn} ${styles.active}`}>
                Click me !
            </button>
            <button className={[styles.btn, styles.active].join(' ')}>
                Click me !
            </button> */}
        </>
    )
}

export default Button
