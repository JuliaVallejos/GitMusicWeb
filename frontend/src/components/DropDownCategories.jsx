import {Dropdown,ButtonToolbar} from "rsuite"
import '../../node_modules/rsuite/dist/styles/rsuite-default.css'

const DropDownCategories =(props)=>{
  
const CustomDropdown = ({ ...props }) => (
    <Dropdown {...props}>
      <Dropdown.Item>New File</Dropdown.Item>     
    </Dropdown>
  );
  
   return(
    <ButtonToolbar>
      <CustomDropdown title="Hover" trigger="hover" /> 
    </ButtonToolbar>
  );

}

export default DropDownCategories