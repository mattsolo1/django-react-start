import React from 'react'

import {Segment, Grid} from 'semantic-ui-react'


const BaseLayout = (props) =>
    <div style={{height:'calc(100% - 40px)'}}>
        <BaseLayout.Header />

        <Grid style={{minHeight:'calc(100% - 40px)'}}>
            <Grid.Row>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={14} style={{ marginTop: "30px"}}>
                    {props.children}
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
        </Grid>

        <BaseLayout.Footer />
    </div>

export default BaseLayout


BaseLayout.Header = () =>
    <Segment style={{
        backgroundColor:"#F3F3F3",
        borderStyle:'solid',
        borderWidth:"0px 0px 1px 0px",
        borderColor:'#E2E2E2'
    }}>
        <Grid style={{color:'#272727'}}>
            <Grid.Row>
                <Grid.Column width={4}
                             style={{
                                 fontSize: 16,
                                 fontFamily: 'sans-serif',
                                 fontWeight: 400
                             }}>
                    &nbsp;
                </Grid.Column>
                <Grid.Column width={12}></Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>




BaseLayout.Footer = ({children}) =>
    <Grid style={{
        backgroundColor: "#F3F3F3",
        borderStyle:'solid',
        borderWidth:"1px 0px 0px 0px",
        borderColor:'#E2E2E2' }}>

        <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}> &nbsp; </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
    </Grid>