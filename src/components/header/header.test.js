import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header';

const fakeProps = {
    siteTitle: 'Gatsby Blog',
    tagline: 'My Blog',
    author: 'Sabrina Markon',
    contacts: {
        github: 'SabrinaMarkon',
        linkedin: 'SabrinaMarkon'
    }
}

describe("Header", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<Header
                siteTitle={fakeProps.siteTitle}
                tagline={fakeProps.tagline}
                author={fakeProps.author}
                contacts={fakeProps.contacts} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
