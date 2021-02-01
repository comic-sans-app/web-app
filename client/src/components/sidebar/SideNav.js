import React from 'react'
import { Nav, Navbar, Accordion, Card} from 'react-bootstrap';

// const Sidebar = () => {
//   return (
//     <Nav variant='dark' className='flex-column' id='sidebar'>
//       <Navbar className='flex-column' bg='dark' variant='dark'>
//         <Nav.Item>
//           <Accordion className='sidebar'>
//             <Card className='side-accordion-card'>
//               <Accordion.Toggle as={Card.Header} eventKey='0'>
//                 1
//               </Accordion.Toggle>
//               <Accordion.Collapse eventKey='0'>
//                 <Card.Body></Card.Body>
//               </Accordion.Collapse>
//             </Card>
//           </Accordion>
//         </Nav.Item>
//         <Nav.Item>
//           <Accordion>
//             <Card className='side-accordion-card'>
//               <Accordion.Toggle as={Card.Header} eventKey='0'>
//                 2
//               </Accordion.Toggle>
//               <Accordion.Collapse eventKey='0'>
//                 <Card.Body></Card.Body>
//               </Accordion.Collapse>
//             </Card>
//           </Accordion>
//         </Nav.Item>
//         <Nav.Item>
//           <Accordion>
//             <Card className='side-accordion-card'>
//               <Accordion.Toggle as={Card.Header} eventKey='0'>
//                 3
//               </Accordion.Toggle>
//               <Accordion.Collapse eventKey='0'>
//                 <Card.Body></Card.Body>
//               </Accordion.Collapse>
//             </Card>
//           </Accordion>
//         </Nav.Item>
//       </Navbar>
//     </Nav>
//   );
// };

// export default Sidebar;


export default function SideNav() {
  return (
    <Navbar bg="dark" variant="dark" className='d-flex flex-column'>
      <Nav.Item>
        <Nav.Link>
          Templates
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>
          Uploads
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>
          Photos
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>
          Elements
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>
          Text
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  )
}

