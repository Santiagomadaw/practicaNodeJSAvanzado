import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import Form from '../shared/Form';
import Select from '../shared/Select';
import FormField from '../shared/FormField';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters, getIsLogged, getSlider, getTagsLoaded } from '../../store/selectors';
import { authLogout, clearFilters, tagsLoader, updateFilterBuysell, updateFilterPrice, updateFilterSearch, updateFilterTags } from '../../store/actions';
import Confirmator from '../shared/Confirmator';

function Header() {
    const logState = useSelector(getIsLogged)
    const filters= useSelector(getFilters)
    const tags = useSelector(getTagsLoaded)
    const sliderRange = useSelector(getSlider);
    const dispatch = useDispatch()
    const [hideDelete, setHideDelete] = useState(false);

    const handleLogoutClick = () => {
        setHideDelete(true);
        
    };
    useEffect(() => {
            dispatch(tagsLoader())         
    }, [dispatch]);

    const handleLogoutConfim = async () => {
        dispatch(authLogout())
    
};
    

    const handleChangeSlide = (event) => {
            dispatch(updateFilterPrice(event))
        
    };

    const handleSearchChange = (event) => {
        dispatch(updateFilterSearch(event.target.value))

    };
    const handleBuysellChange = (event) => {
        dispatch(updateFilterBuysell(event.target.value))

    };

    const handleChangeMultiSelect = (event) => {
        const options = Array.from(event.target.selectedOptions).map(
            (option) => option.value
        );
        dispatch(updateFilterTags(options))
    
    };

    const handleClear = async (event) => {
        event.preventDefault();
        dispatch(clearFilters(sliderRange))
        
    };

  
    return (
        <>
         <Confirmator
        textValue='Seguro que desea borrar?'
        onConfirm={handleLogoutConfim}
        hidden ={hideDelete}
        sethiden ={setHideDelete}
    />
        <StyledHeader className='header'>
           
            <Link to='/adverts'>
                <h1>
                    <span>w</span>allopop
                </h1>
            </Link>
            {logState ? (
                <>
                    <Form id='search'>
                        <div className='formslider'>
                            <FormField
                                $customheight='25px'
                                $customwidth='100%'
                                type='text'
                                placeholder='Buscar'
                                name='search'
                                value={filters.search}
                                id='searchItem'
                                onChange={handleSearchChange}
                            />
                            <Slider
                                value={filters.price}
                                range
                                min={0}
                                max={sliderRange[1]}
                                step={10}
                                onChange={handleChangeSlide}
                            />
                            
                                <div className='slidertext'>
                                    <h5>{filters.price[0]}€</h5>
                                    <h5>{filters.price[1]}€</h5>
                                </div>
                            
                        </div>

                        <Select
                            $customheight='initial'
                            $customwidth='120px'
                            name='tags'
                            id='tagsSelect'
                            value={filters.tags}
                            multiple
                            onChange={handleChangeMultiSelect}
                        >
                            <option value='' disabled>
                                --Tags--
                            </option>
                            {tags.map((tag, index) => (
                                <option value={tag} id={tag} key={index}>
                                    {tag}
                                </option>
                            ))}
                        </Select>
                        <div className='selectbutton'>
                            <Select
                                $customheight='25px'
                                $customwidth='100px'
                                name='buysell'
                                id='buysell'
                                value={filters.buysell}
                                onChange={handleBuysellChange}
                            >
                                <option value='all' disabled>
                                    --Option--
                                </option>
                                <option value='buy' id='buy'>
                                    Compra
                                </option>
                                <option value='sell' id='sell'>
                                    Venta
                                </option>
                            </Select>

                            <Button
                                id='searchbutton'
                                onClick={handleClear}
                                $customheight='25px'
                                $customwidth='100px'
                            >
                                Reset
                            </Button>
                        </div>
                    </Form>
                    <nav className='navContainer'>
                        <ul>
                            <li>
                                <Button
                                    className='login'
                                    onClick={handleLogoutClick}
                                    id='logOutButton'
                                    $customheight='25px'
                                    $customwidth='140px'
                                >
                                    Logout
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='signup'
                                    as={Link}
                                    to='/adverts/new'
                                    $customheight='25px'
                                    $customwidth='140px'
                                    replace
                                >
                                    Nuevo Anuncio
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='goads'
                                    as={Link}
                                    to='/adverts'
                                    $customheight='25px'
                                    $customwidth='140px'
                                    replace
                                >
                                    Anuncios
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <></>
            )}
        </StyledHeader>
        </>
    );
}



export default Header;

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    z-index: 2;
    gap: 10px;
    border-bottom: 1px solid grey;
    position: sticky;
    top: 0;
    padding: 2px 10px;
    color: var(--text-100);
    .formslider {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        .rc-slider {
            width: 98%;
            margin: auto;
            margin-top: 10px;
        }
        .slidertext {
            display: flex;
            justify-content: space-between;
            h5 {
                color: var(--text-100);
            }
        }
    }
    h1 {
        font-family: 'Grandstander', cursive;
        font-weight: 900;
        span {
            font-size: 40px;
        }
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 3px;
        li {
            list-style-type: none;
            min-width: fit-content;
        }
    }
`;
