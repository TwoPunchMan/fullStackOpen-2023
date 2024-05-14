import React from "react"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from "./BlogForm"

test('create a new blog correctly on onSubmit', async () => {
  const createNewBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={createNewBlog} />)

  const inputTitle = screen.getByPlaceholderText('Title')
  await user.type(inputTitle, 'testing the blog form')

  const inputAuthor = screen.getByPlaceholderText('Author')
  await user.type(inputAuthor, 'meredith shepherd')

  const inputUrl = screen.getByPlaceholderText('Url')
  await user.type(inputUrl, 'http://www.learnprogramming.com')

  const createBtn = screen.getByText('create')
  await user.click(createBtn)

  expect(createNewBlog.mock.calls).toHaveLength(1)

  expect(createNewBlog.mock.calls[0][0].title).toBe('testing the blog form')
  expect(createNewBlog.mock.calls[0][0].author).toBe('meredith shepherd')
  expect(createNewBlog.mock.calls[0][0].url).toBe('http://www.learnprogramming.com')
})
