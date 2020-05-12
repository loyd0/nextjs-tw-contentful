import React from 'react'
import PropTypes from 'prop-types'


import Img from 'gatsby-image'
const ImgWrapper = ({ image, alt, style, imageMaxWidth=1080, quality=80,className, ...restProps }) => {

    const { width, height, url, title } = image
    const fluidData = {
        aspectRatio: width / height,
        src: url + `?w=${imageMaxWidth}px&q=${quality}`,
        srcSet: ` 
            ${url}?w=${width / 4}&&q=${quality} ${width / 4}w,
            ${url}?w=${width / 2}&&q=${quality} ${width / 2}w,
            ${url}?w=${width}&&q=${quality} ${width}w,
            ${url}?w=${width * 1.5}&&q=${quality} ${width * 1.5}w,
            ${url}?w=1000&&q=${quality} 1000w,`,
        sizes: `(max-width: ${imageMaxWidth}) 100vw, ${imageMaxWidth}px`
    }

    return <Img
        className="w-full"
        alt={alt || title}
        style={style}
        fluid={fluidData}
        {...restProps}
    />
}

ImgWrapper.propTypes = {

}

export default ImgWrapper
