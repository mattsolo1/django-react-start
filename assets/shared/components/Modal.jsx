import React from 'react'

import {Modal, Icon} from 'semantic-ui-react'

const CustomModal = ({title, onClose, children, size="small"}) =>
    <Modal open={true} onClose={onClose} size={size}>
        <Modal.Header>
            {title}
            <span style={{float: "right", cursor: "pointer"}} onClick={onClose}>
                  <Icon name="remove" style={{fontSize: "15px", color: "#A3A3A3"}} />
            </span>
        </Modal.Header>
        <Modal.Content style={{textAlign:"center"}}>
            {children}
        </Modal.Content>
    </Modal>

CustomModal.propTypes = {
    title: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
    size: React.PropTypes.oneOf(['small', 'large', 'fullscreen']),
}


export default CustomModal