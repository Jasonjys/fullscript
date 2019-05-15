// import React from 'react'
// import { expect } from 'chai'
// import { shallow } from 'enzyme'
// import PhotoGallery from '../components/Card'

// const getAppWithContext = (context) => {
  
//   // Will then mock the LocalizeContext module being used in our LanguageSelector component
//   jest.doMock('../contextProvider/AppContextProvider', () => {
//     return {
//       LocalizeContext: {
//         Consumer: (props) => props.children(context)
//       }
//     }
//   });
  
//   // you need to re-require after calling jest.doMock.
//   // return the updated LanguageSelector module that now includes the mocked context
//   return require('./LanguageSelector').LanguageSelector;
// };

// describe('Card component', () => {
//   let wrapper;

//   beforeEach(() => {
//     jest.resetModules();
//     wrapper = shallow(<PhotoGallery />);
//   })

//   it('renders without exploding', () => {
//     expect(wrapper).to.have.lengthOf(1)
//   })

//   it('renders 1 image', () => {
//     expect(wrapper.find(Img)).to.have.lengthOf(1)
//   })
// })