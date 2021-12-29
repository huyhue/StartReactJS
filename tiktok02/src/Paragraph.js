import { useContext } from "react"
import { ThemeContext } from './ThemeContext'


function Paragraph(){
    const context = useContext(ThemeContext)

    return (
        <p className={context.theme}>
            ok ok ok ok o ooooooooooooooooooo
        </p>
    )
}

export default Paragraph
