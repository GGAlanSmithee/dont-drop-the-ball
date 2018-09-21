const sizes = {
    Icon: {
        small: '1rem',
        medium: '2rem',
        large: '3rem',
    }
}

export default (element, size) => sizes[element][size || 'medium']
