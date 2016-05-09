import DisplayInfoModal from './DisplayInfoModal'

const MODAL_COMPONENTS = {
	'DISPLAY_INFO': DisplayInfoModal
	/* other modals */
}

const ModalRoot = ({ modalType, modalProps }) => {
	if (!modalType) {
		return <span />
	}

	const SpecificModal = MODAL_COMPONENTS[modalType]
	return <SpecificModal {...modalProps} />
}

export default connect(
	state => state.modal
)(Modal)
