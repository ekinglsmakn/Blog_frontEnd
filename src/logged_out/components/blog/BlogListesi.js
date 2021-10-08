import React, {Component, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Grid, Box, isWidthUp, withWidth, withStyles} from "@material-ui/core";
import BlogCard from "./BlogCard";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as blogActions from "../../../redux/Actions/blogActions"

const styles = (theme) => ({
    blogContentWrapper: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(4),
            marginRight: theme.spacing(4),
        },
        maxWidth: 1280,
        width: "100%",
    },
    wrapper: {
        minHeight: "60vh",
    },
    noDecoration: {
        textDecoration: "none !important",
    },
});

function getVerticalBlogPosts(width, blogPosts) {
    const gridRows = [[], [], []];
    let rows;
    let xs;
    if (isWidthUp("md", width)) {
        rows = 3;
        xs = 4;
    } else if (isWidthUp("sm", width)) {
        rows = 2;
        xs = 6;
    } else {
        rows = 1;
        xs = 12;
    }
    blogPosts.forEach((blogPost, index) => {
        gridRows[index % rows].push(
            <Grid key={blogPost.id} item xs={12}>
                <Box mb={3}>


                    <BlogCard

                        src={blogPost.src}
                        title={blogPost.title}
                        snippet={blogPost.snippet}
                        date={blogPost.date}
                        url={blogPost.url}

                    />

                </Box>
            </Grid>
        );
    });
    return gridRows.map((element, index) => (
        <Grid key={index} item xs={xs}>
            {element}
        </Grid>
    ));
}

class BlogListesi extends Component {
    // const { classes, width, blogPosts, selectBlog } = props;
    //
    // useEffect(() => {
    //   this.props.actions.getBlogs();
    //   selectBlog();
    // }, [selectBlog]);
    componentDidMount() {
        this.props.actions.getBlogs();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                className={classNames(this.props.classes.wrapper, "lg-p-top")}
            >
                <div className={this.props.classes.blogContentWrapper}>
                    <Grid container spacing={3}>
                        {getVerticalBlogPosts(this.props.width, this.props.blogPosts)}
                    </Grid>
                </div>
            </Box>
        );
    }

}

BlogListesi.propTypes = {
    selectBlog: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    blogPosts: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {

    return {currentBlog: state.blogReducer}

}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getBlogs: bindActionCreators(blogActions.getBlogs, dispatch)
        }
    }
}

// export default withWidth()(withStyles(styles, { withTheme: true })(BlogListesi));
export default withWidth()(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogListesi))));
