import React from "react";

const ModalTemplate = ({ childern }) => {

  return (
    <div>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{childern.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {childern.content}
            </div>
            <div className="modal-footer">
              <div type="button" className="btn btn-secondary" data-dismiss="modal">Close</div>
              <div type="button" className="btn btn-primary">Save changes</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}