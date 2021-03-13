import {useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import * as React from "react";
import {addTodo} from "../actions";
import {connect} from "react-redux";
function TodoForm(props) {


    const [todo, setTodo] = useState('');
    const [color, setColor] = useState('#0984e3');
    const [priority, setPriority] = useState('Low');

    function handleChange(e) {
        setTodo(e.target.value);
    }
    function handleColor(e) {
        setColor(e.target.value);
    }
    function handlePriority(e) {
        setColor(e.target.value);
    }

    function handleSubmit(e) {

        console.log(props.filtered);
        console.log(props.todos);

        if(todo !== '') {
            props.addTodo(todo,color,priority);
            setTodo('');
            setColor('#0984e3');
            setPriority('Low');
            props.onHide(true);
        }
        e.preventDefault();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Todo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.Label>Title :</Form.Label>
                                    <Form.Control type="text"   placeholder="Title"  onChange={handleChange} value={todo} />

                                </Form.Group>

                            </Col>
                        </Row>
                    <Row>

                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Priority :</Form.Label>
                                <Form.Control as="select" onChange={handlePriority}>
                                    <option value="Low" >Low</option>
                                    <option value="Medium" >Medium</option>
                                    <option value="High" >High</option>
                                </Form.Control>

                            </Form.Group>

                        </Col>

                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Color :</Form.Label>
                                <Form.Control as="select" onChange={handleColor}>
                                    <option value="#0984e3" style={{color:"#0984e3"}}> Blue </option>
                                    <option value="#6c5ce7" style={{color:"#6c5ce7"}}>Purple</option>
                                    <option value="#fd79a8" style={{color:"#fd79a8"}}>Red</option>
                                    <option value="#fdcb6e" style={{color:"#fdcb6e"}}>Yellow</option>
                                    <option value="#00b894" style={{color:"#00b894"}}>Green</option>
                                </Form.Control>

                            </Form.Group>

                        </Col>
                    </Row>
                    <Row >
                        <Col sm={12}>
                            <Form.Group>

                                <Button type="submit" className="float-right">  Add  </Button>

                            </Form.Group>
                        </Col>
                    </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapDipatchToProps = {
    addTodo
}

export default connect(null, mapDipatchToProps)(TodoForm)