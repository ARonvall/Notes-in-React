import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css'
import List from './components/List'
import Editor from './components/Editor'
import Form from './components/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import * as N from './utils/noteHelpers'
import {getNotes} from './utils/noteHelpers'

function App() {
  const [selectedNote, setSelectedNote] = useState(undefined)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const notes = getNotes()
    setNotes(notes)
  }, [])

  const refreshList = () => {
    const notes = getNotes()
    setNotes([...notes])
  }

  return (
    <Container>
      <Jumbotron>
        <h1>Notes</h1>
      </Jumbotron>
      <Row>
        <Col xs={12} md={4}>
          <Button variant="dark" block className="mb-3">
            Ny Note
          </Button>
          <List notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        </Col>
        <Col xs={12} md={8}>
          <Form refreshList={refreshList} selectedNote={selectedNote} />
          {/* <Editor /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default App