import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import Notes from "../Notes";
import CodeDate from "../CodeDate";
import Modal from "simple-react-modal";
import _ from "lodash";
import Translate from 'react-translate-component'

class StaticListItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {


        let visibleChanged = this.props.modal.modalIsOpen !== nextProps.modal.modalIsOpen;
        let visible = nextProps.modal.modalIsOpen;
        let modalWasThisItem = _.isEqual(this.props.modal.item, this.props.item);
        let modalIsThisItem = _.isEqual(nextProps.modal.item, this.props.item)
            || _.isEqual(nextProps.modal.item, nextProps.item);

        // check if info box require update
        if (( visibleChanged || visible) && (modalWasThisItem || modalIsThisItem)) {
            return true;
        }

        // check if content has changed
         return !(
            _.isEqual(this.props.item, nextProps.item)
            && _.isEqual(this.props.item.active, nextProps.item.active)
            && _.isEqual(this.props.idx         ,nextProps.idx)
            && _.isEqual(this.props.displayName ,nextProps.displayName)
            && _.isEqual(this.props.type        ,nextProps.type)
        );

    }


    renderItemList() {
        const {item, displayName, type, actions, modal, idx, translations} = this.props;


        if (item.children && item.children.length > 0) {
            const listEl = item.children.map((childItem, key) => {
                    if (childItem._links) {
                        return (
                            <li key={"item"+key} role="treeitem" tabIndex="-1">
                                <Link to={`/klassifikasjoner/${childItem.id}`} className="child-link">
                                    <span>{childItem.name}&#160;&#160;»</span>
                                    <span className="link-type">{childItem.classificationType}</span>
                                </Link>
                            </li>
                        )
                    } else {
                        let name
                        switch (type) {
                            case 'code':
                            case 'variant':
                                name = <span className="itemName"><b>{childItem.code}</b> - <span className="longName">{childItem.name}</span>
                                    <span className="shortName" aria-hidden="true">{childItem.shortName}</span>
                                </span>
                                break;
                            case 'classFamilies':
                                name = <span>{childItem.name} ({childItem.numberOfClassifications})</span>
                                break;
                            default:
                                name = <span>{childItem.name}</span>
                        }
                        return (
                            <StaticListItem
                                key={type + key}
                                idx={key}
                                item={childItem}
                                displayName={name}
                                type={type}
                                actions={actions}
                                translations={translations}
                                modal={modal}/>
                        )
                    }
                }
            )

            const hidden = item.active ? 'false' : 'true'
            return (
                <ol className="delemne-children" role="tree" aria-hidden={hidden}>
                    {listEl}
                </ol>
            )
        }
    }

    closeModal() {
        const {actions} = this.props
        actions.hideModal()
    }

    renderNoteBlocks(arr) {
        return arr.map(function (item, key) {
            var splitted = item.split(/:(.+)?/)
            if (splitted.length > 1) {
                return (
                    <div className="flex-container" key={key}>
                        <div className="label">{splitted[0]}:</div>
                        <div className="content">{splitted[1]}</div>
                    </div>
                )
            } else {
                return (
                    <div className="flex-container" key={key}>
                        <div className="content">{splitted[0]}</div>
                    </div>
                )
            }

        })
    }

    renderModal() {
        const {modal, item, translations} = this.props


        if (!modal.modalIsOpen || !_.isEqual(modal.item, item)) {
            return null
        }


        if (modal.contentType === "notes") {
            let noteBlock = modal.item.notes.split('\n')


            return (
                <Modal
                    className='modal-notes'
                    closeOnOuterClick={true}
                    show={modal.modalIsOpen}
                    onClose={this.closeModal.bind(this)}>
                    <div className="modal-content">
                        <a onClick={this.closeModal.bind(this)}>
                            <i className="fa fa-times-circle-o close-button" aria-hidden="true"/>
                        </a>
                        <h5>{modal.item.code} - {modal.item.name}</h5>
                        {this.renderNoteBlocks(noteBlock)}
                    </div>
                </Modal>
            )
        } else {
            return <Modal
                className='modal-notes'
                closeOnOuterClick={true}
                show={modal.modalIsOpen}
                onClose={this.closeModal.bind(this)}>
                <div className="modal-content">
                    <a onClick={this.closeModal.bind(this)}>
                        <i className="fa fa-times-circle-o close-button" aria-hidden="true"/>
                    </a>
                    {/*<h5>{modal.item.code} - {modal.item.name}</h5>*/}
                    <div className="content">
                        {translations.validFromText}&nbsp;{item.validFrom} <br/> {!_.isEmpty(item.validTo)
                        ? translations.validToText  + " " + item.validTo
                        : translations.stillValidText}
                    </div>
                </div>
            </Modal>
        }
    }


    toggle(e) {
        e.preventDefault();
        const {item, idx, actions, type, search} = this.props

        if (item.numberOfClassifications || item.children) {
            if (type === 'code' || type === 'variant') {
                actions.toggleCode(item.code, type)
            } else {
                actions.toggleSubject(idx, search)
            }
        }
    }

    render() {

        const {item, displayName, actions, idx, translations} = this.props
        const toggleIcon = (item.children || item.numberOfClassifications) ? (item.active ? 'hovedemne collapse' : 'hovedemne expand') : 'last-item'
        let showHide = <span className="screen-reader-only">{translations.screenReaderShowHide}</span>

        return (
            <li key={"li" +idx} className={toggleIcon} role="treeitem" aria-expanded={item.active === true}>
                <a className="toggle-children clearfix" onClick={(ev) => this.toggle(ev)} role="link" href="#">
                    {showHide}
                    {displayName}
                    <CodeDate item={item} actions={actions}/>
                    <Notes item={item} actions={actions}/>
                </a>
                {this.renderModal()}
                {this.renderItemList()}
            </li>
        )
    }
}



StaticListItem.propTypes = {
    item: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    displayName: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    translations: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
    search: state.searchResult.search
})

export default StaticListItem
