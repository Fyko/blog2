import React from "react"
import {
  Hr,
  Layout,
  LayoutContent,
  layoutContentPadding,
} from "../components/Layout"
import { Link as GatsbyLink, graphql } from "gatsby"
import Popup from "../components/Popup"
import SEO from "../components/Seo"
import { FaTag, FaTags } from "react-icons/fa"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Toastable } from "../components/Popup"
import { MDXProvider } from "@mdx-js/react"
import * as AllMarkdownComponents from "../components/Markdown"
import * as Chakra from "@chakra-ui/layout"
import * as ChakraReact from "@chakra-ui/react"
import { useBrandColor, useBrandSecondaryColor } from "../hooks/color"
import { Image } from "@chakra-ui/image"
import { Table, Td, Th, Tr } from "@chakra-ui/table"
import { RoughNotation } from "react-rough-notation"
const { overrides: MarkdownOverrides, ...rest } = AllMarkdownComponents
const MarkdownComponents = rest
const { Box, Flex, Grid, Heading, Link, Stack, Text } = Chakra

const Navigator = ({ pos, link }) => {
  const isLeft = pos === "left"
  const hasLink = Boolean(link)

  const data = (
    <Box
      p={4}
      m={0}
      height="100%"
      overflow="hidden"
      borderRadius="sm"
      borderWidth="1px"
      layerStyle={["borderSubtle", hasLink ? "bgSecondary" : null]}
    >
      <Heading
        fontSize="md"
        as="h3"
        fontWeight="bold"
        mb={1}
        layerStyle={hasLink ? "textPrimary" : "textSecondary"}
      >
        {isLeft ? "Previous" : "Next"} Article
      </Heading>
      {link ? (
        <Text as="p" mb={0} fontSize="md" layerStyle="textSecondary">
          {link.frontmatter.title}
        </Text>
      ) : (
        <Text mb={0} as="i" layerStyle="textTertiary" fontSize="md">
          {isLeft ? (
            "Wow you just read the first post. Why are you even here?"
          ) : (
            <>
              <Link
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=co1VrBdaRhA"
                target="_blank"
              >
                Sheeesh
              </Link>
              , you just read the last post
            </>
          )}
        </Text>
      )}
    </Box>
  )

  if (!link) {
    return data
  }

  return (
    <Link
      as={GatsbyLink}
      to={link.fields.slug}
      textDecoration="none !important"
      height="100%"
    >
      {data}
    </Link>
  )
}

function makeHeader(type) {
  return ({ children, ...props }) => (
    <Heading as={type} mb={4} fontSize={["xl", null, "2xl"]} {...props}>
      {children}
    </Heading>
  )
}

export const maxWidth = "49rem"

export default function Post({ data, pageContext, location }) {
  const post = data.mdx
  const { previous, next, ogImage } = pageContext
  const brand = useBrandSecondaryColor()
  const TagIcon = post.frontmatter?.tags?.length > 1 ? FaTags : FaTag
  const hasTags = post.frontmatter?.tags?.length > 0
  const { imageTop, imageBottom } = post.frontmatter
  const isDraft = post.frontmatter.draft
  return (
    <>
      <Layout imageTop={imageTop} imageBottom={imageBottom} article>
        <Box
          layerStyle={["bgSecondary", "borderSubtlePrimary"]}
          pt={[8, 12, 24]}
          borderBottomWidth="1px"
        >
          <Grid
            gap={2}
            as="header"
            p={layoutContentPadding}
            mx="auto"
            maxWidth={maxWidth}
          >
            {post.frontmatter.draft && (
              <Box mb={2}>
                <Flex
                  zIndex={10}
                  width="100%"
                  mx="auto"
                  flexFlow="row"
                  maxWidth={maxWidth}
                >
                  <Text color={brand} fontSize={["sm", null, "lg"]}>
                    🥺 You're viewing a draft. This post is not published.
                  </Text>
                </Flex>
              </Box>
            )}
            <Flex alignItems="center" layerStyle="textTertiary">
              <Text as="time" dateTime={post.frontmatter.date} color="gray.500">
                {post.frontmatter.date}
              </Text>
              <Box mx="10px">·</Box>
              <Text color="gray.500">{post.fields.readingTime.text}</Text>
            </Flex>
            <Heading
              as="h1"
              fontSize={["xl", "2xl", "3xl"]}
              lineHeight="1.4"
              fontWeight="black"
            >
              {post.frontmatter.title}
            </Heading>
            <Text
              fontSize={["lg", "xl"]}
              fontWeight="medium"
              layerStyle="textTertiary"
            >
              {post.frontmatter.description}
            </Text>
          </Grid>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#0099ff"
              fill-opacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg> */}
        </Box>
        <LayoutContent mx="auto" maxWidth={maxWidth}>
          <SEO
            canonical={post.slug}
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            image={ogImage}
          />

          <style
            dangerouslySetInnerHTML={{
              __html: ` #gatsby-focus-wrapper { overflow: hidden; } `,
            }}
          />
          <Grid as="article" gap={2}>
            <Box as="section" fontSize="lg" lineHeight="1.7">
              <MDXProvider
                components={{
                  ...MarkdownComponents,
                  ...MarkdownOverrides,
                  ...Chakra,
                  ...ChakraReact,
                  maxWidth,
                  ChakraImage: Image,
                  Toastable,
                  Hr,
                  a: ({ children, ...props }) => (
                    <Link color={brand} {...props}>
                      {children}
                    </Link>
                  ),
                  Text,
                  h6: makeHeader("h6"),
                  h5: makeHeader("h5"),
                  h4: makeHeader("h4"),
                  h3: makeHeader("h3"),
                  h2: makeHeader("h2"),
                  h1: makeHeader("h1"),
                  table: ({ children, ...props }) => (
                    <Table mb={6} {...props}>
                      {children}
                    </Table>
                  ),
                  th: Th,
                  tr: Tr,
                  td: ({ children, ...props }) => (
                    <Td
                      fontSize={["sm", "md", "lg"]}
                      verticalAlign="initial"
                      {...props}
                    >
                      {children}
                    </Td>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <Box
                      as="blockquote"
                      layerStyle="borderSubtle"
                      // borderColor="text.secondary"
                      borderLeftWidth="2px"
                      borderLeft="solid"
                      paddingInlineStart={4}
                      {...props}
                    >
                      {children}
                    </Box>
                  ),
                  p: ({ children, ...props }) => (
                    <Text
                      as="p"
                      fontSize={["md", null, "lg"]}
                      // lineHeight="1.8"
                      mb={6}
                      {...props}
                    >
                      {children}
                    </Text>
                  ),
                }}
              >
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
            </Box>
            {!isDraft && (
              <>
                <Hr />
                <Box as="footer">
                  <Grid
                    as="section"
                    gridAutoFlow="row"
                    alignItems="center"
                    justifyContent="center"
                    gridTemplateColumns={["1fr", null, null, "1fr 1fr"]}
                    flexDirection={["row", "column"]}
                    gap={4}
                    m={0}
                    p={0}
                    className="justify-center flex flex-row p-0 m-0 text-sm w-fullgap-4"
                  >
                    <Navigator pos="left" link={previous} />
                    <Navigator pos="right" link={next} />
                  </Grid>
                </Box>
              </>
            )}
          </Grid>
          <Popup />
        </LayoutContent>
      </Layout>
    </>
  )
}
export const pageQuery = graphql`
  fragment Cover on File {
    image: childImageSharp {
      gatsbyImageData(
        quality: 90
        breakpoints: [400, 1200, 1920]
        layout: FULL_WIDTH
      )
    }
  }

  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        draft
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
        imageTop {
          src {
            ...Cover
          }
          opacity
        }
      }
    }
  }
`
