import './Modal.css'

const NavModal = props => {
  // close the modal
  // if (!props.open) return null;

  return (
    <div className={`modal ${props.open ? 'open' : ''}`} onClick={props.onClose}>
      <div className="nav-modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="close" onClick={props.onClose}>&times;</span>
          {props.header}
        </div>

        <div className="nav-modal-body">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default NavModal