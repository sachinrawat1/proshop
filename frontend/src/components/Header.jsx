import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { removeCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { resetCart } from "../slices/cartSlice";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img src={logo} alt="ProShop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <FaUser />
                    Signup
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
