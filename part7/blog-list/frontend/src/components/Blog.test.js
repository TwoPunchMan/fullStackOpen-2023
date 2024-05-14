import React from "react"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render blog title and author', () => {
  const blog = {
    title: "This is a test blog",
    author: "Testy McTesterson"
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  screen.debug()
  expect(div).toHaveTextContent("This is a test blog")
  expect(div).toHaveTextContent("Testy McTesterson")
})

test('check blog url/likes when show details button clicked', async () => {
  const blog = {
    title: "GTA VI is out in 2025",
    author: "Tommy Vercetti",
    user: "Helios One",
    url: "http://www.tompetty.com",
    likes: 120
  }

  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} />)

  const blogDiv = container.querySelector('.blog')

  const hideBtn = screen.getByText('hide')
  await user.click(hideBtn)

  screen.debug()
  expect(blogDiv).toHaveTextContent("http://www.tompetty.com")
  expect(blogDiv).toHaveTextContent(120)
})

test('like button is clicked twice', async () => {
  const blog = {
    title: "Dental plan Lisa needs braces",
    author: "Jon Majors",
    user: "Barbie",
    url: "http://www.wgu.edu",
    likes: 500
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} upLike={mockHandler} />)

  const user = userEvent.setup()

  const hideBtn = screen.getByText('hide')
  await user.click(hideBtn)

  const likeBtn = screen.getByText('like')
  await user.click(likeBtn)
  await user.click(likeBtn)

  screen.debug()
  expect(mockHandler.mock.calls).toHaveLength(2)
})
