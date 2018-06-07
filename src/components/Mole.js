import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import media from "./media"

/**
 * The margin calculation is taking the combined width of the row's
 * elements, subtracting that from the total viewport width to give
 * the remainder, and deviding the remainder into 8(left and right margins
 * for each of the 4 elements)
 *
 * The reason we do it this way, is so we have a fixed width for
 * the images, since they will scale differently, we want to have more control
 * over them
 */
export const MoleContainer = styled.div`
  border-radius: 50%;
  cursor: crosshair;
  display: flex;
  height: 75px;
  margin: 20px calc((100% - (4*75px)) / 8);
  position: relative;
  width: 75px;

  &:active {
    background-color: ${props => props.success && "hsl(120, 50%, 60%)"};
  }

  ${media.tablet`
    height: 150px;
    margin: 20px calc((100% - (4*150px)) / 8);
    width: 150px;
  `};
`

export const MoleWrapper = styled.div`
  display: block
  height: 80%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`

export const BombWrapper = styled.div`
  display: block
  height: 80%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`

export const BombImg = styled.div`
  background: url("http://clipartist.net/openclipart.org/2013/Mo/AhNinn/bomb-555px.png") no-repeat center;
  background-size: contain;
  height: 100%;
  left: 0;
  position: absolute;
  top: ${({active}) => active ? 0 : "80px"};
  width: 100%;

  transition: all 0.2s ease-in;
`

export const MoleImg = styled.div`
  background: url("http://katherinekato.com/misc/mole.svg") no-repeat center;
  background-size: contain;
  height: 100%;
  left: 0;
  position: absolute;
  top: ${({active}) => active ? 0 : "80px"};
  width: 100%;

  transition: all 0.2s ease-in;
`

export const DirtImg = styled.div`
  background: url("http://katherinekato.com/misc/dirt.svg")
    no-repeat center bottom 5px;
  background-size: contain;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
`

function Mole ({ active, index, onMoleClick, bomb }) {
  const onClick = () => {
    onMoleClick(index)
  }

  return (
    <MoleContainer
      className="mole-container"
      onClick={onClick}
      success={active}>
      <BombWrapper>
        <BombImg className="bomb-image" active={bomb}/>
      </BombWrapper>
      <MoleWrapper>
        <MoleImg className="mole-image" active={active}/>
      </MoleWrapper>
      <DirtImg />
    </MoleContainer>
  )
}

Mole.propTypes = {
  active: PropTypes.bool,
  bomb: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onMoleClick: PropTypes.func.isRequired,
}

Mole.defaultProps = {
  active: false,
}

export default Mole
