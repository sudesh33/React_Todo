import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Form, FormControl, InputGroup,
    ListGroup,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSearch, faToggleOff, faToggleOn, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {deleteTodo, editTodo, addTodo, filterStatus, handleSearch, filterByColor} from "../actions";
import {connect} from "react-redux";
import * as React from "react";
import TodoForm from "./TodoForm";




function TodoList(props) {
    const [modalShow, setModalShow] = React.useState(false);

    function deleteHandler(e) {
        const eleID =parseInt( e.currentTarget.dataset.tag);
        props.deleteTodo(eleID)
    }

    function changeStatus(e) {
        const eleID =parseInt( e.currentTarget.dataset.tag);
        props.editTodo(eleID);

    }
    
    function filterCompleted() {
        props.filterStatus(true);
    }

    function filterTodo() {
        props.filterStatus(false);
    }

    function handleSearch(e) {
        props.handleSearch(e.target.value)

    }
    function filterByColor(e) {
        props.filterByColor(e.target.value)

    }

    const arr = props.filtered;

    const listItems = arr.map((val, index) =>
        <ListGroup.Item key={index}  style={{backgroundColor:val.color}}>
            {val.name} - {val.priority}
            <OverlayTrigger overlay={<Tooltip >Delete</Tooltip>} placement="bottom">
                <a className="float-right btn  btn-outline-danger ml-2" data-tag={val.id} onClick={deleteHandler}> <FontAwesomeIcon icon={faTrashAlt} /> </a>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip > {val.active === true ? "Mark as Complete" : "Mark as Not Complete"} </Tooltip>} placement="bottom">
                <a className="float-right btn  btn-outline-dark" data-tag={val.id} onClick={changeStatus} > <FontAwesomeIcon icon={ val.active === true ? faToggleOn :  faToggleOff } />  </a>
            </OverlayTrigger>
        </ListGroup.Item>
    );
    return <div className="mt-3">
        <Container>
            <Row>
                <Col sm={4}>
                    <InputGroup className="mb-3">
                        <FormControl onChange={handleSearch}
                            placeholder="Search Todos"

                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" ><FontAwesomeIcon icon={faSearch} /> </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col sm={2}>
                    <Button varient="success"  onClick={() => setModalShow(true)}>Add New</Button>
                    <TodoForm
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <Form.Group>
                        <Form.Label>Color :</Form.Label>
                        <Form.Control as="select" onChange={filterByColor}>
                            <option value="" > Select.. </option>
                            <option value="#0984e3" style={{color:"#0984e3"}}> Blue </option>
                            <option value="#6c5ce7" style={{color:"#6c5ce7"}}>Purple</option>
                            <option value="#fd79a8" style={{color:"#fd79a8"}}>Red</option>
                            <option value="#fdcb6e" style={{color:"#fdcb6e"}}>Yellow</option>
                            <option value="#00b894" style={{color:"#00b894"}}>Green</option>
                        </Form.Control>

                    </Form.Group>

                </Col>
            </Row>
            <Row>
                <Col sm={6}>

                    <ButtonGroup >
                        <Button variant="primary" onClick={filterTodo}>Todo</Button>
                        <Button variant="secondary" onClick={filterCompleted}>Completed</Button>
                    </ButtonGroup>
                   
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <h3>Todo List</h3>
                    <hr/>
                    <ListGroup>{listItems}</ListGroup>
                </Col>
            </Row>
        </Container>
    </div>


}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        filtered: state.filtered
    }
}

const mapDipatchToProps = {
    deleteTodo, editTodo , filterStatus ,handleSearch , filterByColor
}

export default connect(mapStateToProps,mapDipatchToProps)(TodoList);