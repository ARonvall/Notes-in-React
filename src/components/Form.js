import React, {useState, useEffect} from 'react'
import BootstrapForm from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {createNote, updateNote, deleteNote} from '../utils/noteHelpers'

const NOTIFICATION_INITIAL_VALUE = ''

export default function Form({selectedNote, setSelectedNote, refreshList}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [notification, setNotification] = useState(NOTIFICATION_INITIAL_VALUE)

  useEffect(() => {
    if (selectedNote) return setTitle(selectedNote.title)
    setTitle('')
    setBody('')
  }, [selectedNote])

  useEffect(() => {
    if (selectedNote) setBody(selectedNote.body)
  }, [selectedNote])

  useEffect(() => {
    setTimeout(() => setNotification(NOTIFICATION_INITIAL_VALUE), 3000)
  }, [notification])

  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeBody = (e) => setBody(e.target.value)
  const onSave = (e) => {
    e.preventDefault()
    setTitle('')
    setBody('')
    setNotification('CREATED')
    if (selectedNote) {
      updateNote(selectedNote.id, title, body)
      return refreshList()
    }

    createNote(title, body)
    refreshList()
  }

  const onDelete = (e) => {
    e.preventDefault()
    if (!selectedNote) return
    const {id} = selectedNote
    deleteNote(id)
    refreshList()
    setTitle('')
    setBody('')
    setNotification('DELETED')
  }

  return (
    <BootstrapForm>
      <BootstrapForm.Group controlId="formTitle">
        <BootstrapForm.Label>Title</BootstrapForm.Label>
        <BootstrapForm.Control value={title} onChange={onChangeTitle} />
      </BootstrapForm.Group>
      <BootstrapForm.Group controlId="formNote">
        <BootstrapForm.Label>Note</BootstrapForm.Label>
        <BootstrapForm.Control as="textarea" rows={3} value={body} onChange={onChangeBody} />
      </BootstrapForm.Group>
      <Button variant="success" onClick={onSave}>
        Spara
      </Button>{' '}
      {selectedNote && (
        <Button variant="danger" onClick={onDelete}>
          Ta bort
        </Button>
      )}
      {notification && (
        <Alert variant="success" className="mt-2">
          {notification}
        </Alert>
      )}
    </BootstrapForm>
  )
}