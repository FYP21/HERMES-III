import React from 'react'
import { useState, useEffect } from 'react';
import { ApiClient } from 'admin-bro';
import { Box, H1, H2, H5, H4, Badge, Link, Button, Loader, Text } from '@admin-bro/design-system';
import moment from 'moment';

const api = new ApiClient()

const Dashboard = () => {
  
  const [loading, setLoading] = useState(false);
  const [next_review, setNext_review] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    api
      .resourceAction({
        resourceId: "reviews",
        actionName: "list",
      })
      .then((result) => {
        if (result.data.records && Array.isArray(result.data.records)) {
            console.log(result.data.records);
            setNext_review(result.data.records);
            setLoading(!loading);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    var date = moment()
                  .utcOffset('+08:00')
                  .format(' YYYY-MM-DD');
    setCurrentDate(date);
    console.log(date);
  }, []);

  console.log(next_review);
  const pending_review = next_review.filter((review) => review.params.status === 'Pending');
  const overdue_review = next_review.filter((review) => review.params.status === 'Overdue');
  
 
  return (
    <Box variant="grey">
       <H1 textAlign="center">
        <strong>Welcome to HERMES III Dashboard</strong>
      </H1>
          <hr/>
          <Box flex>
            <Box variant="grey" flex flexDirection="column">
              
            <H2><strong>Upcoming Reviews  </strong><Badge variant="danger">{pending_review.length}</Badge> </H2>

            {!loading ? (<Loader />) : (
            next_review.map((reviews) => {
              if(reviews.params.status == "Pending" && reviews.params.next_review < {currentDate}){
                return (
                  
                    
                      <Box variant="card" mt={10} >
                          <Box flexGrow={0}>
                            <Box p="xl">
                              <H4 fontWeights="bolder">
                                <strong>{reviews.populated.policyId.title}</strong>
                              </H4>
                              <Badge variant="info">{reviews.params.status}</Badge>
                              <H5>Next Review: {reviews.params.next_review}</H5>
                            
                              <hr/>
                              <Link href={'/admin/resources/reviews/records/' + reviews.params.id + '/show' }>
                                <Button onClick={() => {}} >Review</Button>
                              </Link>
                            </Box>
                          </Box>
                      </Box>
                  );
                    }
                })
              )}
        </Box>

        <Box variant="grey" flex flexDirection="column" flexGrow={1}>
            <H2><strong>Overdue  </strong><Badge variant="danger">{overdue_review.length}</Badge> </H2>
    
                  {!loading ? ( <Loader />) : (
                  next_review.map((reviews) => {
                    if(reviews.params.status == "Overdue"){
                      return (
                          
                            <Box variant="card" mt={10}>
                                <Box flexGrow={0}>
                                  <Box p="xl">
                                    <H4 fontWeights="bolder">
                                      <strong>{reviews.populated.policyId.title}</strong>
                                    </H4>
                                    <Badge variant="danger">{reviews.params.status}</Badge>
                                    <H5>Next Review: {reviews.params.next_review}</H5>
                                    <hr/>
                                    <Link href={'/admin/resources/reviews/records/' + reviews.params.id + '/show' }>
                                      <Button onClick={() => {}} >Review</Button>
                                    </Link>
                                  </Box>
                                </Box>
                            </Box>
                        );}
                      })
                    )}
        </Box>


       </Box>
    </Box>
  );
};
     

export default Dashboard