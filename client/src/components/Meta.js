import React from 'react'

const Meta = ({ title, description, keywords }) => {
    return (
        <div>
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='keyword' content={keywords} />
        </div>
    )

}

Meta.defaultProps = {
    title: 'Welcome To Lushak Ecommerce',
    description: 'We sell the best products at cheaper rates',
    keywords: 'shoes, buy shoes, cheap shoes',
}

export default Meta