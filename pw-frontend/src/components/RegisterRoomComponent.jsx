import React, { useState, useEffect } from 'react';
import { listResource, registerResource, acceptResource, rejectResource, getCurrentUserEmpid, 
        getCurrentUserToken, addResource, updateResourceNote } from '../services/ResourceService';
import '../css/RegisterResource.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import userService from '../services/userService';
import AddResourceComponent from './AddResourceComponent';
import { Button} from 'react-bootstrap';
import UpdateResourceComponent from './UpdateResourceComponent'

const RoomRegistration = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  const [acceptedResources, setAcceptedResources] = useState([]); // Trạng thái để theo dõi resource đã được duyệt
  const [currentUserEmpid, setCurrentUserEmpid] = useState(null);
  const [currentUserToken, setCurrentUserToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentResourceId, setCurrentResourceId] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);


  //const [currentUser, setCurrentUser] = useState<{ empid: string | null, token: string | null, role: string | null } | null>(null);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userEmpid = await getCurrentUserEmpid();
        if (userEmpid) {
          setCurrentUserEmpid(userEmpid); // Pass an object to setCurrentUser
          //console.log("empid ne",currentUserEmpid);
        } else {
          console.error('User information is missing from localStorage');
        }

        const userToken = await getCurrentUserToken();
        if (userToken) {
          setCurrentUserToken(userToken);
          //console.log("token ne", currentUserToken);
        } else {
          console.error('User information is missing from localStorage');
        }

      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser(); // Call the function to get the current user information
  }, [currentUserEmpid, currentUserToken]);

  useEffect(() => {
    if(currentUserToken){
      listResource(currentUserToken)
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the resources!', error);
        setError('Error fetching resources.');
      });
    }
    
  }, [currentUserToken]);

  const handleRegister = (resourceId) => {
     registerResource(resourceId, currentUserEmpid, currentUserToken)
      .then(response => {
        alert('Đăng ký thành công!');
        setResources(prevResources => prevResources.map(resource =>
          resource.id === resourceId ? { ...resource, status: 'Đã đăng ký', employee: currentUserEmpid } : resource
        ));
        window.location.reload();
      })
      .catch(error => {
        console.error('There was an error registering the room!', error);
        setError('Error registering the room.');
      });
  };

const handleAccept = (resourceId) => {
    console.log(`Accepted resource with id: ${resourceId}`);
    acceptResource(resourceId, currentUserToken)
      .then(response => {
        alert('Đã chấp nhận đăng ký!');
        setAcceptedResources(prevAcceptedResources => [...prevAcceptedResources, resourceId]); // Thêm resourceId vào danh sách các resource đã duyệt
        setResources(prevResources => prevResources.map(resource =>
          resource.id === resourceId ? { ...resource, status: 'Đã được mượn'} : resource
        ));
      })
      .catch(error => {
        console.error('There was an error accepting the room!', error);
        setError('Bạn không có quyền này!');
      });
  };

  const handleReject = (resourceId) => {
    console.log(`Rejected resource with id: ${resourceId}`);
    rejectResource(resourceId, currentUserToken)
      .then(response => {
        alert('Đã từ chối đăng ký!');
        setAcceptedResources(prevAcceptedResources => [...prevAcceptedResources, resourceId]); // Thêm resourceId vào danh sách các resource đã duyệt
        setResources(prevResources => prevResources.map(resource =>
          resource.id === resourceId ? { ...resource, status: 'Còn trống', employee: null } : resource
        ));
      })
      .catch(error => {
        console.error('There was an error rejecting the room!', error);
        setError('Bạn không có quyền này!');
      });
    
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveResource = (newResource) => {
      addResource(newResource, currentUserToken)
      .then(response => {
        alert('Đã thêm tài nguyên mới!');
        window.location.reload();
        })
        .catch(error => {
        console.error('There was an error rejecting the room!', error);
        setError('Bạn không có quyền này!');
      });
  };

  const handleOpenNoteModal = (resourceId) => {
    setCurrentResourceId(resourceId);
    setShowNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setCurrentResourceId(null); 
    setNewNote('');
  };

  const handleSaveNote = (newNote) => {
    updateResourceNote(currentResourceId, newNote, currentUserToken)
    .then(response => {
      alert('Ghi chú đã được cập nhật!');
      setResources(prevResources => prevResources.map(resource =>
        resource.id === currentResourceId ? { ...resource, note: newNote } : resource
      ));
      handleCloseNoteModal();
    })
    .catch(error => {
      console.error('There was an error updating the note!', error);
      setError('Error updating the note.');
    });
  };

  
  const commonStyle = {
    color: 'white',
    borderRadius: '5px',
    //padding: '5px 10px', // Padding hợp lý để vừa với chữ
    margin: '5px 0',
    display: 'incline-block',
    textAlign: 'center',
    fontSize: '15px', // Kích thước font hợp lý để vừa với chữ
    lineHeight: '2' // Chiều cao dòng để đảm bảo chữ không bị cắt
    
  };

  const acceptStyle = {
    ...commonStyle,
    backgroundColor: 'green'
  };

  const rejectStyle = {
    ...commonStyle,
    backgroundColor: 'red'
  };


  return (
    <div className="containerRegister">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center">Danh sách tài nguyên</h2>
          {error && <p className="text-danger text-center">{error}</p>}
           {userService.isAdmin() === true && (
          <Button variant="primary" onClick={handleOpenModal}>
            Thêm Tài Nguyên
          </Button>
          )}
          <AddResourceComponent
            show={showModal}
            handleClose={handleCloseModal}
            handleSave={handleSaveResource}
          />
          
          
          <table className="table table-striped table-bordered mt-4">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Tên tài nguyên</th>
                <th>Loại tài nguyên</th>
                <th>Trạng thái</th>
                <th>Người mượn</th>    
                <th>Ghi chú</th>              
                <th>Thực hiện</th>  
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <tr key={resource.id}>
                  <td>{resource.id}</td>
                  <td>{resource.name}</td>
                  <td>{resource.resourceType ? resource.resourceType.name : 'No type'}</td>
                  <td>{resource.status}</td>
                  <td>{resource.employee ? resource.employee.name : ''}</td>
                  <td>{resource.note}
                  {userService.isAdmin() && (
                      <div className="update-note" onClick={() => handleOpenNoteModal(resource.id)}>
                        Cập nhật
                      </div>
                    )}
                    <UpdateResourceComponent
                      show={showNoteModal}
                      handleClose={handleCloseNoteModal}
                      handleSave={handleSaveNote}
                      note={newNote}
                      setNote={setNewNote}
                    />
                  </td>
                  <td>
                    {resource.status === 'Còn trống' && (
                      <button className="btn btn-success" onClick={() => handleRegister(resource.id)}>
                        Đăng ký
                      </button>
                    )}
                    {resource.status === 'Đã đăng ký' && (
                     userService.isAdmin() ? (
                              <DropdownButton id={`dropdownMenuButton-${resource.id}`} title="Xác nhận" variant="warning">
                                  <Dropdown.Item href="#" style={acceptStyle} onClick={() => handleAccept(resource.id)}>Đồng ý</Dropdown.Item>
                                  <Dropdown.Item href="#" style={rejectStyle} onClick={() => handleReject(resource.id)}>Từ chối</Dropdown.Item>
                              </DropdownButton>
                          ) : (
                              <button className="btn btn-warning">Chờ duyệt</button>
                          )
                       )}
                    {resource.status === 'Đã được mượn' && userService.isAdmin() && (
                        //<span style={{ fontStyle: 'italic' }}>Đã duyệt</span>
                        <button className="btn btn-secondary" onClick={() => handleReject(resource.id)}>
                        Thu hồi 
                      </button>
                    )}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomRegistration;
