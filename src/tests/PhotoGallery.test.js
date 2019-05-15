import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { act } from 'react-dom/test-utils';

import PhotoGallery from '../components/PhotoGallery'
import { AppContext } from '../contextProvider/AppContext'

describe('Gallery component', () => {
  let container;
  beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
  });

  afterEach(() => {
      document.body.removeChild(container);
      container = null;
  });

  it("shows loader when loading", () => {
    const mockContext = {
      state: {
        loading: true
      }
    }

    act(() => {
        ReactDOM.render((
            <AppContext.Provider value={mockContext}>
              <PhotoGallery />
            </AppContext.Provider>
        ), container);
    })

    const loader = container.querySelector('i')
    expect(loader).to.exist
  });

  it("shows 'No result' when photos array is empty", () => {
    const mockContext = {
      state: {
        loading: false,
        photos: []
      }
    }

    act(() => {
      ReactDOM.render((
        <AppContext.Provider value={mockContext}>
          <PhotoGallery />
        </AppContext.Provider>
      ), container);
    })

    const div = container.querySelector('div')
    expect(div.textContent).to.equal('No result')
  })

  it("shows imgages when photos exists", () => {
    const mockContext = {
      state: {
        currentPage: 1,
        pageSize: 20,
        orderedBy: "popular",
        loading: false,
        photos: [{
          id: "fakeId",
          urls: {
            regular: "https://fakeurl/"
          }
        }],
        total: 1
      }
    }

    act(() => {
      ReactDOM.render((
        <AppContext.Provider value={mockContext}>
          <PhotoGallery />
        </AppContext.Provider>
      ), container);
    })

    const image = container.querySelector('img')
    expect(image.src).to.equal(mockContext.state.photos[0].urls.regular)
  })
})
